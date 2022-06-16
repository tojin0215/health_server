let express = require('express');
let router = express.Router();
var WorkoutAlloted = require('../models').WorkoutAlloted;
const sequelize = require('sequelize');
const workoutAlloted = require('../models/workoutAlloted');
const Op = sequelize.Op;

router
  .route('/workoutAlloted')
  .get(function (req, res) {
    WorkoutAlloted.findAll({
      where: {
        fitness_no: req.query.fitness_no,
        client_no: req.query.client_no,
      },
    })
      .then((WorkoutAlloted) => {
        res.json(WorkoutAlloted);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  })
  //insert
  .post(function (req, res) {
    WorkoutAlloted.create({
      fitness_no: req.body.fitness_no,
      client_no: req.body.client_no,
      workout: req.body.workout,
      region: req.body.region,
      machine: req.body.machine,
      default_set: req.body.default_set,
      //null이면 3세트
      default_count: req.body.default_count,
      //null이면 8회
      default_rest: req.body.default_rest,
      //null이면 30초
      url: req.body.url,
      completed: 0,
    })
      .then(() => {
        res.send({ message: 'ok' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  //delete
  .delete(function (req, res) {
    workoutAlloted
      .destroy({
        where: {
          idwa: req.query.idwa,
        },
      })
      .then(() => {
        res.send({ delete: 'delelte' });
      })
      .catch((err) => {
        console.error(err);
      });
  });

module.exports = router;
