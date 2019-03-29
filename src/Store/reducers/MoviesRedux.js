const types = {
  SYNC_MOVIES: 'SYNC_MOVIES',
  CLEAR_MOVIES: 'CLEAR_MOVIES',
};

export const actions = {
  sync_movies: (dispatch, response) => {
    var data = {
      movies: response.movies,
      page: response.page,
      isMoreAvailable: response.isMoreAvailable,
      totalResults: response.totalResults,
    };

    dispatch({
      type: types.SYNC_MOVIES,
      data: data
    });
  },
  clear_movies: (dispatch) => {
    dispatch({
      type: types.CLEAR_MOVIES,
    });
  }
}

const initialState = {
  movies: [],
  page: 0,
  totalResults: 0,
  isMoreAvailable: true
}

export const reducer = (state = initialState, action) => {
  let {data, type} = action;
  switch(type) {
    case types.SYNC_MOVIES:
      data.movies = (state.movies).concat(data.movies)
    let anant = Object.assign({}, state,  data)
      return Object.assign({}, state,  data)
    case types.CLEAR_MOVIES:
      return Object.assign({}, state, initialState)
    default:
      return state;
  }
}