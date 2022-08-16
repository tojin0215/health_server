let express = require('express');
let router = express.Router();
var Voucher = require('../models').Voucher;

const sequelize = require('sequelize');

router
  .route('/voucher')
  .get(function (req, res) {
    Voucher.findAll({
      where: {
        fitness_no: req.query.fitness_no,
        client_name: req.query.client_name,
      },
    })
      .then((voucher) => {
        res.json(voucher);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  })
  .post(function (req, res) {})
  .put(function (req, res) {})
  .delete(function (req, res) {});
module.exports = router;
