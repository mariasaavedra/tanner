'use strict';

fetch('http://localhost:3000/reports').then(function (response) {
  return response.json();
}).then(function (data) {
  return console.log(data);
});
