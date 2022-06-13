let express = require('express');
let router = express.Router();
var Workout = require('../models').Workout;
const sequelize = require('sequelize');
const Op = sequelize.Op;

router
  .route('/workout')
  //select
  .get(function (req, res) {
    Workout.findAll({
      where: {
        fitness_no: req.query.fitness_no,
        part: req.query.part,
      },
    })
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  })
  //insert
  .post(function (req, res) {
    Workout.create({
      fitness_no: req.body.fitness_no,
      workout: req.body.workout,
      part: req.body.part,
      machine: req.body.machine,
      default_set: req.body.default_set,
      //null이면 3세트
      default_count: req.body.default_count,
      //null이면 8회
      default_rest: req.body.default_rest,
      //null이면 30초
      url: req.body.url,
    })
      .then(() => {
        res.send({ message: 'ok' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  //update
  .put(function (req, res) {
    if (req.query.type === 'allot') {
      Workout.update(
        {
          default_set: req.body.default_set,
          default_count: req.body.default_count,
          default_rest: req.body.default_rest,
        },
        { where: { idw: req.query.idw, fitness_no: req.query.fitness_no } }
      )
        .then(() => {
          res.send('update1');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Workout.update(
        {
          workout: req.body.workout,
          part: req.body.part,
          machine: req.body.machine,
          default_set: req.body.default_set,
          default_count: req.body.default_count,
          default_rest: req.body.default_rest,
          url: req.body.url,
        },
        { where: { idw: req.query.idw, fitness_no: req.query.fitness_no } }
      )
        .then(() => {
          res.send('update2');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  })
  //delete
  .delete(function (req, res) {
    Workout.destroy({
      where: { idw: req.query.idw },
    })
      .then((result) => {
        res.send('Delete');
      })
      .catch((err) => {
        console.error(err);
      });
  });

module.exports = router;
