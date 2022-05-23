let express = require('express');

let router = express.Router();
var Clinet = require('../models').Clinet;

const sequelize = require('sequelize');
const Op = sequelize.Op;

router.route('/client').get(function (req, res) {
  Clinet.findAll({
    where: {
      fitness_no: req.query.fitness_no,
    },
  });
});

module.exports = router;
