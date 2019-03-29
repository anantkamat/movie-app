import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import {connect} from 'react-redux';
import styles from './styles.js'
class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      length: props.liked_movies.movie.length
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.liked_movies.movie.length != this.props.liked_movies.movie.length) {
      this.setState({
        length: this.props.liked_movies.movie.length
      })
    }
  }

  render() {
    let { onPress, isInLikedList, showCount, menuButton } = this.props
    if(menuButton && this.state.length > 0) {
      isInLikedList = true
    }
    return (
    <View>
      <TouchableHighlight
        onPress={() => onPress()}
        activeOpacity={0.8}
        underlayColor="#fff"
        style={styles.buttonStyle}>
        <Image
          source={require("./icon-love.png")}
          style={[
            styles.imageButton,
            isInLikedList && styles.imageButtonActive
          ]}
          resizeMode="contain"
        />
      </TouchableHighlight>
      {
        showCount ?
          <View style={styles.countView}>
            <Text style={styles.countText}>{this.state.length}</Text>
          </View> : null
      }
    </View>
    );
  }
}

const mapStateToProps = ({ liked_movies }) => {
  return { liked_movies }
};

export default connect(mapStateToProps)(LikeButton)