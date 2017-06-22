import 'whatwg-fetch';

/* eslint-disable no-console */

export function getUsers() {
  return get('users');
}

function get(url) {
  return fetch(url).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error);
}
