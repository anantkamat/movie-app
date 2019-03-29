import React, { Component } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import {connect} from 'react-redux';
import { MovieItem, LikeButton } from '@components'
import { Api } from '@services'
import { Header, Icon, Item, Text, Input, Button } from 'native-base';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import styles from './styles'

class MoviesList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <View></View>,
      headerTitleStyle: styles.headerTitleStyle,
      headerRight: <View style={styles.RightIcon}><LikeButton menuButton={true} onPress={() => {navigation.navigate('LikedMovies')}} showCount={true} /></View>,
      title: `Movies`
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      moveis: props.movies.movies,
      liked_movies: props.liked_movies.movie,
      page: props.movies.page,
      totalResults: props.movies.totalResults,
      isMoreAvailable: props.movies.isMoreAvailable,
      refreshing: false,
      isLoading: false,
      search_text: '',
    }

    this.Api = new Api();
    this.fetchMovies = this.fetchMovies.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.loadMoreMovies = this.loadMoreMovies.bind(this)
    this.refresh = this.refresh.bind(this)
    this.searchMovies = this.searchMovies.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.movies) != JSON.stringify(this.props.movies) || JSON.stringify(prevProps.liked_movies.movie) != JSON.stringify(this.props.liked_movies.movie) && this.state.search_text == "") {

      this.setState({
        movies: this.props.movies.movies,
        liked_movies: this.props.liked_movies.movie,
        page: this.props.movies.page,
        totalResults: this.props.movies.totalResults,
        isMoreAvailable: this.props.movies.isMoreAvailable
      })
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    this.props.clear_movies();
    this.fetchMovies(1)
  }

  fetchMovies(page) {
    if(this.state.isMoreAvailable && this.state.search_text == "") {
      this.setState({
        isLoading: true
      }, function() {
        let params = {
          's': 'bat',
          'page': page,
        }

        this.Api.getAllMovies(params, (response) => {
          isMoreAvailable = true
          if(response.totalResults.length == 0) {
            isMoreAvailable = true
          }

          let data = {
            movies: response.Search,
            totalResults: response.totalResults,
            page: page,
            isMoreAvailable : isMoreAvailable
          }
          this.props.sync_movies(data)
          this.setState({
            isLoading: false,
            refreshing: false
          })
        }, (error) => {
        })
      })
    }
  }

  searchMovies(name) {
    this.setState({search_text: name}, function() {
      if(name.length == 0) {
        this.refresh();
      }

      if(name.length > 2) {
        let params = {
          's': name,
        }

        this.Api.getAllMovies(params, (response) => {
          if(response.Search && response.Search.length) {
            this.setState({movies: response.Search})
          }
          else {
            this.setState({movies: []})
          }
        }, (error) => {
        })
      }
    })
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

  loadMoreMovies() {
    this.fetchMovies(Number(this.state.page + 1))
  }

  render() {
    return (
    <View style={{paddingBottom: 55}}>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input onChangeText={(text) => this.searchMovies(text)} placeholder="Minimum 3 letters to search movie" />
        </Item>
      </Header>
      <FlatList
        ref="flatList"
        data={this.state.movies}
        keyExtractor={(item, index) => `post__${index}`}
        renderItem = {this.renderItem}
        onEndReached={this.loadMoreMovies}
        extraData={this.state}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this.refresh}
          />
        }
      />
      <OrientationLoadingOverlay
        visible={this.state.isLoading}
        color="white"
        indicatorSize="large"
        messageFontSize={12}
        message="Loading Movies.."
      />
    </View>
    );
  }
}

const mapStateToProps = ({ movies, liked_movies }) => {
  return { movies, liked_movies }
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
