const types = {
  MANAGE_LIKED_LIST: 'MANAGE_LIKED_LIST',
};

export const actions = {
  manage_liked_movie_list: (dispatch, response) => {

    dispatch({
      type: types.MANAGE_LIKED_LIST,
      movie: response
    });
  }
}

const initialState = {
  movie: [],
}

export const reducer = (state = initialState, action) => {
  let {movie, type} = action;
  switch(type) {
    case types.MANAGE_LIKED_LIST:
      const isExisted = state.movie.some((item) => compareMovies(item, action))
      if(!isExisted) {
        let movies = {}
        movies['movie'] = [...state.movie, movie];
        return Object.assign({}, state,  movies)
      }
      else {
        return Object.assign({}, state, {movie: state.movie.filter((item) => !compareMovies(item, action))})
      }
    default:
      return state;
  }
}

const compareMovies = (item, action) => {
  return item.imdbID === action.movie.imdbID
}