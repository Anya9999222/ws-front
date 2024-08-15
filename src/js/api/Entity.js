import createRequest from './createRequest';

export default class Entity {
  constructor() {
    this.URL = 'http://localhost:3000/';
  }

  create(data, callback) {
    createRequest({
      url: this.URL + 'new-user/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
      callback,
    });
  }
}
