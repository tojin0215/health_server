let express = require('express');
let router = express.Router();
var Genetic = require('../models').Genetic;

const sequelize = require('sequelize');
const Op = sequelize.Op;
router
  .route('/genetic')
  .get(function (req, res) {
    Genetic.findAll({
      where: {
        fitness_no: req.query.fitness_no,
        member_no: req.query.member_no,
      },
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .post(function (req, res) {})
  .put(function (req, res) {})
  .delete(function (req, res) {});
module.exports = router;
