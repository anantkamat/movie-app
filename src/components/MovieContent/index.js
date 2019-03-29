import React, { Component } from 'react';
import { View } from 'react-native';
import { CardItem, Text, Body } from 'native-base';

export default class MovieContent extends Component {
  render() {
    let { title, value } = this.props
    return (
      <View>
        <CardItem>
          <Body>
            <Text>{title} </Text>
            <Text style={{color: '#6A6A6A', fontSize: 14}}>
              {value}
            </Text>
          </Body>
        </CardItem>
      </View>
    );
  }
}