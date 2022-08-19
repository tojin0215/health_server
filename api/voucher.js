let express = require('express');
let router = express.Router();
var Voucher = require('../models').Voucher;

const sequelize = require('sequelize');
const Op = sequelize.Op;
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
  .post(function (req, res) {
    Voucher.create({
      client_name: req.body.client_name,
      fitness_no: req.body.fitness_no,
      kind: req.body.kind,
      paidMembership: req.body.paidMembership,
      paidMembership2: req.body.paidMembership2,
      paymentDate: req.body.paymentDate,
      salesDays: req.body.salesDays,
      salesDays2: req.body.salesDays,
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
    if (req.body.type === 'paidMembership') {
      Voucher.update(
        {
          paidMembership2: -1,
        },
        {
          where: {
            client_name: req.query.client_name,
            kind: req.query.kind,
          },
        }
      )
        .then(() => {
          res.send({ success: 'paidMembership success!' });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (req.body.type === 'salesDays') {
      Voucher.update(
        {
          salesDays2: req.body.salesDays - 1,
        },
        {
          where: {
            client_name: req.query.client_name,
            kind: req.query.kind,
          },
        }
      )
        .then(() => {
          res.send({ success: 'salesDays success!' });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  })
  .delete(function (req, res) {});
module.exports = router;
