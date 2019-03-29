/**
 * @format
 */
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/Store/ConfigureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist';


const persistor = persistStore(store)

const MOVIE = () => (
  <StoreProvider store = {store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </StoreProvider>
)

AppRegistry.registerComponent(appName, () => MOVIE);
