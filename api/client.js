let express = require('express');
let router = express.Router();
var Client = require('../models').Client;

const sequelize = require('sequelize');
const { Trainer } = require('../models');
const Op = sequelize.Op;

router
  .route('/client')
  .get(function (req, res) {
    if (req.query.type === 'reservation') {
      Client.findAll({
        where: {
          idc: req.query.idc,
        },
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (req.query.type === 'searchPhone') {
      Client.findAll({
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
      Client.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          client_name: {
            [Op.like]: '%' + req.query.client_name + '%',
          },
        },
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (req.query.type === 'choiceLogin') {
      Client.findAll({
        where: {
          phone: req.query.phone,
        },
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (req.query.type === 'select') {
      Client.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          idc: req.query.idc,
        },
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (req.query.type === 'phoneCheck') {
      Client.findAll({
        where: {
          fitness_no: req.query.fitness_no,
          phone: req.query.phone,
        },
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Client.findAll({
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
    Client.create({
      fitness_no: req.body.fitness_no,
      client_name: req.body.client_name,
      phone: req.body.phone,
      birth: req.body.birth,
      sex: req.body.sex,
      join_route: req.body.join_route,
      address: req.body.address,
      lockerNumber: req.body.lockerNumber,
      sportswear: req.body.sportswear,
    })
      .then(() => {
        res.send({ success: 'insert success!' });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .put(function (req, res) {
    Client.update(
      {
        client_name: req.body.client_name,
        phone: req.body.phone,
        address: req.body.address,
        lockerNumber: req.body.lockerNumber,
        sportswear: req.body.sportswear,
      },
      {
        where: { idc: req.query.idc },
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
    Client.destroy({
      where: {
        idc: req.query.idc,
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
