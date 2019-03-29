export default class Api {
  constructor() {
    this.base_url = 'http://www.omdbapi.com/';
    this.api_key = '645fddd9'
  }

  getUrl(params) {
    let url = this.base_url + '?apikey=' + this.api_key + '&'

    const array = []
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        array.push(`${key}=${params[key]}`)
      }
    }
   return `${url}${array.join('&')}`
  }

  getAllMovies(params, successCallback, errorCallback) {
    let url = this.getUrl(params)
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      successCallback(responseJson);
    })
    .catch((error) => {
      errorCallback(error);
    });
  }

  getMovieDetails(params, successCallback, errorCallback) {
      let url = this.getUrl(params)
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
      .then((responseJson) => {
        successCallback(responseJson);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }
}
