import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Api } from '@services'
import { MovieContent, LikeButton } from '@components'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import {connect} from 'react-redux';
import styles from './styles'

class MovieView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <View style={styles.leftIcon}><TouchableOpacity onPress={() => navigation.goBack()}><Icon name="ios-arrow-back" /></TouchableOpacity></View>,
      headerTitleStyle: styles.headerTitleStyle,
      headerRight: <View style={styles.RightIcon}><LikeButton menuButton={true} onPress={() => {navigation.navigate('LikedMovies')}} showCount={true} /></View>,
      title: navigation.getParam('movie', null).Title
    }
  }
  constructor(props) {
    super(props)

    this.state = {
      movie: null,
      isLoading: false,
      prop_movie: props.navigation.getParam('movie', null),
      default_url: "https://www.baltimoresportsandlife.com/wp-content/uploads/2016/07/Movies.jpg"
    }
    this.Api = new Api();
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    this.setState({
      isLoading: true
    }, function() {
      let params = {
        'i': this.state.prop_movie.imdbID
      }
      this.Api.getMovieDetails(params, (response) => {
        this.setState({movie: response, isLoading: false, refreshing: false})
      }, (error) => {
      })
    })
  }

  render() {
    const { movie, prop_movie } = this.state
    const { liked_movies, manage_liked_movie_list } = this.props
    let url = movie && movie.Poster != "N/A" ? movie.Poster : this.state.default_url
    let content = {}
    if(movie) {
      content = {
        'Released On:' : movie.Released,
        'Directed By:' : movie.Director,
        'Produced Bu:' : movie.Production,
        'Written By:' : movie.Writer,
        'Actors:' : movie.Actors,
        'Plot:' : movie.Plot,
      }
    }

    let isInLikedList = liked_movies.movie.find((item) => item.imdbID === prop_movie.imdbID) !== undefined

    return (
      <View>
      {
        movie ?
          <ScrollView
          refreshControl={
            <RefreshControl
             refreshing={this.state.refreshing}
             onRefresh={this.refresh}
            />
          }
          >
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: url}} />
                  <Body>
                    <Text>{movie.Title}</Text>
                    <Text note>( {movie.Year} )</Text>
                  </Body>
                </Left>
                <Right style={styles.likeButton}>
                  <LikeButton
                    onPress={() => manage_liked_movie_list(prop_movie)}
                    isInLikedList={isInLikedList}
                  />
                </Right>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: url}} style={styles.image}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon type="MaterialIcons" active name="rate-review" />
                    <Text>{movie.imdbRating} / 10 </Text>
                  </Button>
                </Left>
                <Body>

                </Body>
                <Right>
                  <Button transparent>
                    <Icon active name="ios-time" />
                    <Text>{movie.Runtime}</Text>
                  </Button>
                </Right>
              </CardItem>

              {
                Object.keys(content).map(key => {
                  return (
                    <MovieContent
                      key={key}
                      title={key}
                      value={content[key]}
                    />
                  )
                })
              }
            </Card>
          </ScrollView>
        : null
      }
      <OrientationLoadingOverlay
        visible={this.state.isLoading}
        color="white"
        indicatorSize="large"
        messageFontSize={12}
        message= {`Loading Movie (${this.props.navigation.getParam('movie', null).Title}) Details..`}
      />
      </View>
    );
  }
}

const mapStateToProps = ({ liked_movies }) => {
  return { liked_movies }
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@reducers/LikedMoviesRedux');
  return {
    manage_liked_movie_list: (movie) => {
      actions.manage_liked_movie_list(dispatch, movie);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieView)