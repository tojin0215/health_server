let express = require('express');

let router = express.Router();
var Client = require('../models').Client;

const sequelize = require('sequelize');
const Op = sequelize.Op;

router.route('/client').get(function (req, res) {
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
});

module.exports = router;
