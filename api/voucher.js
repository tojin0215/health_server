let express = require('express');
let router = express.Router();
var Voucher = require('../models').Voucher;

const sequelize = require('sequelize');
const Op = sequelize.Op;
router
  .route('/voucher')
  .get(function (req, res) {
    if (req.query.type === 'reserv') {
      Voucher.findAll({
        where: {
          client_name: req.query.client_name,
          fitness_no: req.query.fitness_no,
          kind: req.query.kind,
        },
      })
        .then((voucher) => {
          res.json(voucher);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else {
      Voucher.findAll({
        where: {
          client_name: req.query.client_name,
          fitness_no: req.query.fitness_no,
        },
      })
        .then((voucher) => {
          res.json(voucher);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  })
  .post(function (req, res) {
    Voucher.create({
      client_name: req.body.client_name,
      fitness_no: req.body.fitness_no,
      kind: req.body.kind,
      paidMembership: req.body.paidMembership,
      paidMembership2: req.body.paidMembership2,
      paymentDate: req.body.paymentDate,
      salesDays: req.body.salesDays,
      salesStart_date: req.body.salesStart_date,
    })
      .then(() => {
        res.send({ success: 'voucher insert!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .put(function (req, res) {
    // increment
    Voucher.update(
      {
        paidMembership2: req.body.paidMembership2,
      },

      {
        where: {
          client_name: req.query.client_name,
          kind: req.query.kind,
        },
      }
    )
      .then((voucher) => {
        res.send({ success: 'paidMembership success!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })

  .delete(function (req, res) {});
module.exports = router;
