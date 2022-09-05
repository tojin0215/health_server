let express = require('express');
let router = express.Router();
var WorkoutStage = require('../models').WorkoutStage;
const sequelize = require('sequelize');

router
  .route('/workoutStage')
  //select
  .get(function (req, res) {
    WorkoutStage.findAll({
      where: {
        fitness_no: req.query.fitness_no,
        stage: req.query.stage,
      },
    })

      .then((workoutStage) => {
        res.json(workoutStage);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  })
  //insert
  .post(function (req, res) {
    WorkoutStage.create({
      stage: req.body.stage,
      fitness_no: req.body.fitness_no,
      workout: req.body.workout,
      part: req.body.part,
      machine: req.body.machine,
      default_set: req.body.default_set,
      default_count: req.body.default_count,
      default_rest: req.body.default_rest,
      url: req.body.url,
    })
      .then(() => {
        res.send('insert');
      })
      .catch((err) => {
        console.error(err);
      });
  })
  //update
  .put(function (req, res) {
    WorkoutStage.update(
      {
        stage: req.body.stage,
        workout: req.body.workout,
        part: req.body.part,
        machine: req.body.machine,
        default_set: req.body.default_set,
        default_count: req.body.default_count,
        default_rest: req.body.default_rest,
        url: req.body.url,
      },
      { where: { fitness_no: req.query.fitness_no, ids: req.query.ids } }
    )
      .then(() => {
        res.send('update');
      })
      .catch((err) => {
        console.error(err);
      });
  })
  //delete
  .delete(function (req, res) {
    if (req.query.type === 'stage') {
      WorkoutStage.destroy({
        where: { stage: req.query.stage },
      })
        .then((result) => {
          res.send('Stage Delete');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      WorkoutStage.destroy({
        where: { ids: req.query.ids },
      })
        .then((result) => {
          res.send('Delete');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
module.exports = router;
