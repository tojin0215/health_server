let express = require('express');
let router = express.Router();
var WorkoutStage = require('..models').WorkoutStage;
const sequelize = require('sequelize');

router
  .route('/workoutStage')
  //select
  .get(function (req, res) {
    WorkoutStage.findAll({
      where: {
        fitness_no: req.query.fitness_no,
        workout: req.query.workout,
      },
    })
      .then((workoutStage) => {
        res.json(workoutStage);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });
//insert

module.exports = router;
