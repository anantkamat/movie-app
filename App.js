/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { MoviesList, LikedMovies, MovieView } from '@containers'
import { createStackNavigator } from 'react-navigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AuthStack />
    );
  }
}

const AuthStack = createStackNavigator(
  {
    MoviesList: {
      screen: MoviesList
    },
    LikedMovies: {
      screen: LikedMovies
    },
    MovieView: {
      screen: MovieView
    }
  },
  {
    initialRouteName: 'MoviesList',
  }
);
