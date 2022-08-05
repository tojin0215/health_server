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
  .post(function (req, res) {
    Genetic.create({
      fitness_no: req.body.fitness_no,
      member_no: req.body.member_no,
      measurementDate: req.body.measurementDate,
      bmi1: req.body.bmi1,
      bmi2: req.body.bmi2,
      bmi3: req.body.bmi3,
      cholesterol1: req.body.cholesterol1,
      cholesterol2: req.body.cholesterol2,
      cholesterol3: req.body.cholesterol3,
      triglyceride1: req.body.triglyceride1,
      triglyceride2: req.body.triglyceride2,
      triglyceride3: req.body.triglyceride3,
      hypertension1: req.body.hypertension1,
      hypertension2: req.body.hypertension2,
      hypertension3: req.body.hypertension3,
      bloodsugar1: req.body.bloodsugar1,
      bloodsugar2: req.body.bloodsugar2,
      bloodsugar3: req.body.bloodsugar3,
      pigmentation1: req.body.pigmentation1,
      pigmentation2: req.body.pigmentation2,
      pigmentation3: req.body.pigmentation3,
      skinfold1: req.body.skinfold1,
      skinfold2: req.body.skinfold2,
      skinfold3: req.body.skinfold3,
      dermis1: req.body.dermis1,
      dermis2: req.body.dermis2,
      dermis3: req.body.dermis3,
      hairthick1: req.body.hairthick1,
      hairthick2: req.body.hairthick2,
      hairthick3: req.body.hairthick3,
      nohair1: req.body.nohair1,
      nohair2: req.body.nohair2,
      nohair3: req.body.nohair3,
      vitaminc1: req.body.vitaminc1,
      vitaminc2: req.body.vitaminc2,
      vitaminc3: req.body.vitaminc3,
      caffeine1: req.body.caffeine1,
      caffeine2: req.body.caffeine2,
      caffeine3: req.body.caffeine3,
    })
      .then(() => {
        res.send({ success: 'genetic insert!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .put(function (req, res) {
    Genetic.update(
      {
        measurementDate: req.body.measurementDate,
        bmi1: req.body.bmi1,
        bmi2: req.body.bmi2,
        bmi3: req.body.bmi3,
        cholesterol1: req.body.cholesterol1,
        cholesterol2: req.body.cholesterol2,
        cholesterol3: req.body.cholesterol3,
        triglyceride1: req.body.triglyceride1,
        triglyceride2: req.body.triglyceride2,
        triglyceride3: req.body.triglyceride3,
        hypertension1: req.body.hypertension1,
        hypertension2: req.body.hypertension2,
        hypertension3: req.body.hypertension3,
        bloodsugar1: req.body.bloodsugar1,
        bloodsugar2: req.body.bloodsugar2,
        bloodsugar3: req.body.bloodsugar3,
        pigmentation1: req.body.pigmentation1,
        pigmentation2: req.body.pigmentation2,
        pigmentation3: req.body.pigmentation3,
        skinfold1: req.body.skinfold1,
        skinfold2: req.body.skinfold2,
        skinfold3: req.body.skinfold3,
        dermis1: req.body.dermis1,
        dermis2: req.body.dermis2,
        dermis3: req.body.dermis3,
        hairthick1: req.body.hairthick1,
        hairthick2: req.body.hairthick2,
        hairthick3: req.body.hairthick3,
        nohair1: req.body.nohair1,
        nohair2: req.body.nohair2,
        nohair3: req.body.nohair3,
        vitaminc1: req.body.vitaminc1,
        vitaminc2: req.body.vitaminc2,
        vitaminc3: req.body.vitaminc3,
        caffeine1: req.body.caffeine1,
        caffeine2: req.body.caffeine2,
        caffeine3: req.body.caffeine3,
      },
      {
        where: {
          fitness_no: req.query.fitness_no,
          member_no: req.query.member_no,
        },
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
    Genetic.destroy({
      where: { member_no: req.query.member_no },
    })
      .then(() => {
        res.send({ success: 'delete success!' });
      })
      .catch((err) => {
        console.error(err);
      });
  });
module.exports = router;
