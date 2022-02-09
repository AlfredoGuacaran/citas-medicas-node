const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

app.get('/usuarios', (req, res) => {
  let usersList = '';
  axios
    .get(`https://randomuser.me/api/?results=100`)
    .then((data) => {
      let users = data.data.results;
      users = users.forEach((user, i) => {
        user.id = uuidv4().slice(0, 6);
        user.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
        usersList += `${i + 1}. Nombre: ${user.name.first} - Apellido: ${
          user.name.last
        } - ID: ${user.id} - Timestamp: ${user.timestamp}`;
      });
      res.send(usersList);
      console.log(usersList);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(3000, function () {
  console.log('Servidor andando en el puerto 3000');
});
