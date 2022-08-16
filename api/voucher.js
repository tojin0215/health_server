let express = require('express');
let router = express.Router();
var Voucher = require('../models').Voucher;

const sequelize = require('sequelize');

router
  .route('/voucher')
  .get(function (req, res) {})
  .post(function (req, res) {})
  .put(function (req, res) {})
  .delete(function (req, res) {});
