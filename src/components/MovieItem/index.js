import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { LikeButton } from '@components'
import {connect} from 'react-redux';

class MovieItem extends Component {

  render() {
    const { movie, onPress, liked_movies } = this.props
    let url = (movie.Poster != "N/A") ? movie.Poster : "https://www.baltimoresportsandlife.com/wp-content/uploads/2016/07/Movies.jpg"
    isInLikedList = liked_movies.movie.find((item) => item.imdbID === movie.imdbID) !== undefined
    return (
        <CardItem style={{borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
          <Left>
            <Thumbnail source={{uri: url}} />
            <Body>
              <Text>{movie.Title}</Text>
              <Text note>({movie.Year})</Text>
            </Body>
          </Left>
          <Right>
            <LikeButton
              onPress={onPress}
              isInLikedList={isInLikedList}
            />
          </Right>
        </CardItem>
    );
  }
}

const mapStateToProps = ({ liked_movies }) => {
  return { liked_movies }
};

export default connect(mapStateToProps)(MovieItem)