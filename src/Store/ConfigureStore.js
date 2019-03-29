import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { MoviesRedux, LikedMoviesRedux } from '@reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  movies: MoviesRedux,
  liked_movies: LikedMoviesRedux,
});

const persistConfig = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store =  createStore(persistedReducer, applyMiddleware(thunk));
  return store;
};

const store = configureStore();
export default store;