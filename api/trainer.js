let express = require('express');
let router = express.Router();
var Trainer = require('../models').Trainer;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const crypto = require('crypto');
const { where } = require('sequelize');

router
  .route('/trainer')
  .get(function (req, res) {
    if (req.query.type === 'reservation') {
      Trainer.findAll({
        where: {
          idx: req.query.idx,
        },
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (req.query.type === 'searchPhone') {
      Trainer.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          phone: {
            [Op.like]: '%' + req.query.phone + '%',
          },
        },
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (req.query.type === 'searchName') {
      Trainer.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          trainer_name: {
            [Op.like]: '%' + req.query.trainer_name + '%',
          },
        },
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Trainer.findAll({
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
    }
  })
  .post(function (req, res) {
    Trainer.create({
      phone: req.body.phone,
      birth: req.body.birth,
      trainer_name: req.body.trainer_name,
      fitness_no: req.body.fitness_no,
      ment: req.body.ment,
      history: req.body.history,
      sex: req.body.sex,
      joinNo: req.body.joinNo,
    })
      .then(() => {
        // res.json(result);
        res.send({ success: 'insert success!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .put(function (req, res) {
    Trainer.update(
      {
        trainer_name: req.body.trainer_name,
        ment: req.body.ment,
        history: req.body.history,
      },
      {
        where: { idx: req.query.idx },
      }
    )
      .then(() => {
        res.send({ success: 'update success!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .delete(function (req, res) {
    Trainer.destroy({
      where: {
        phone: req.query.phone,
        fitness_no: req.query.fitness_no,
      },
    })
      .then(() => {
        res.send({ success: 'delete success!' });
      })
      .catch((err) => {
        console.error(err);
      });
  });
module.exports = router;
