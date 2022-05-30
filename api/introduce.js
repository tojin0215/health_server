let express = require('express');
let router = express.Router();
var Introduce = require('../models').Introduce;

const sequelize = require('sequelize');
const Op = sequelize.Op;

router
  .route('/introduce')
  .get(function (req, res) {
    Introduce.findAll({
      where: { idi: req.query.idi },
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .post(function (req, res) {
    Introduce.create({
      fitness_no: req.body.fitness_no,
      manager_name: req.body.manager_name,
      picture: req.body.picture,
      story: req.body.story,
    })
      .then(() => {
        res.send({ success: 'insert success!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  //   .put(function (req, res) {})
  .delete(function (req, res) {
    Introduce.destroy({
      where: {
        idi: req.query.idi,
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
