let express = require('express');

let router = express.Router();
var Client = require('../models').Client;

const sequelize = require('sequelize');
const Op = sequelize.Op;

router
  .route('/client')
  .get(function (req, res) {
    Client.findAll({
      where: {
        fitness_no: req.query.fitness_no,
      },
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .post(function (req, res) {
    Client.create({
      fitness_no: req.body.fitness_no,
      client_name: req.body.client_name,
      phone: req.body.phone,
      birth: req.body.birth,
      sex: req.body.sex,
      join_route: req.body.join_route,
      adress: req.body.adress,
    })
      .then(() => {
        res.send({ success: 'insert success!' });
      })
      .catch((err) => {
        console.error(err);
      });
  });

module.exports = router;
