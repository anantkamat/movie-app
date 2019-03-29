import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { MovieItem, LikeButton } from '@components'
import { Api } from '@services'
import { Icon, Button } from 'native-base';
import styles from './styles'

class MoviesList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <View style={styles.leftIcon}><TouchableOpacity onPress={() => navigation.goBack()}><Icon name="ios-arrow-back" /></TouchableOpacity></View>,
      headerTitleStyle: styles.headerTitleStyle,
      headerRight: <View style={styles.rightIcon}><LikeButton menuButton={true} onPress={() => {navigation.navigate('LikedMovies')}} showCount={true} /></View>,
      title: `Liked Movies`
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      liked_movies: props.liked_movies.movie,
    }

    this.renderItem = this.renderItem.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.liked_movies.movie) != JSON.stringify(this.props.liked_movies.movie)) {
      this.setState({
        liked_movies: this.props.liked_movies.movie,
      })
    }
  }

  redirect(item) {
    this.props.navigation.navigate('MovieView', {movie: item})
  }

  renderItem({item, index}) {
    return(
      <TouchableOpacity
       key={item.imdbID}
       style={styles.renderItem}
       onPress={this.redirect.bind(this, item)}
      >
        <MovieItem
          movie={item}
          onPress={() => {this.props.manage_liked_movie_list(item)}}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        ref="flatList"
        data={this.state.liked_movies}
        keyExtractor={(item, index) => `post__${item.imdbID}`}
        renderItem = {this.renderItem}
        ListEmptyComponent = <View style={styles.emptyView}>
            <Icon style={styles.emptyIcon} type="MaterialCommunityIcons" name="flask-empty-outline" />
            <Text>You didn't liked any movies yet.</Text>
            <Button style={styles.emptyButton} onPress={() => this.props.navigation.navigate("MoviesList")}><Text style={styles.emptyText}>List My Movies</Text></Button>
          </View>
      />
    );
  }
}

const mapStateToProps = ({ liked_movies }) => {
  return { liked_movies }
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@reducers/MoviesRedux');
  const liked_actions = require('@reducers/LikedMoviesRedux');
  return {
    sync_movies: (data) => {
      actions.sync_movies(dispatch, data);
    },
    clear_movies: () => {
      actions.clear_movies(dispatch);
    },
    manage_liked_movie_list: (movie) => {
      liked_actions.actions.manage_liked_movie_list(dispatch, movie);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList)
