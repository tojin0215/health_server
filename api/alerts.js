const express = require('express');
const router = express.Router();
const Alert = require('../models').Alert;

const sequelize = require("sequelize");
const Op = sequelize.Op;

router.route('/alerts')
.get(function(req, res) {
    const fitness_no = req.query.fitness_no;
    
    Alert.findAll({
        where: { 
            fitness_no: fitness_no,
            confirm: 0,
        }
    })
    .then((alerts) => {
        res.json(alerts);
    })
    .catch((err) => {
        console.error(err);
    });
})
.post(function(req, res) {
    // 쓰기
    Alert.create({
        //member_no : 0,
        fitness_no: req.body.fitness_no,
        member_no: req.body.member_no,
        text: req.body.text, 
        confirm: 0,
    }).then(() => {
        Alert.findAll({
            where:{
                fitness_no: req.body.fitness_no,
                start_date: req.body.member_no,
                confirm: 0
            }
        })
        .then((customers) => {
            res.json(customers);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
        res.send(customers);
    })
    .catch((err) => {
        console.error(err);
        res.json({})
    });
})
.put(function(req, res) {
    const criteria = {where:{fitness_no: req.body.fitness_no,member_no: req.body.member_no}}
    if (req.body && req.body.alert_id) {
        criteria.where["alert_id"] = req.body.alert_id
    }

    Alert.update({confirm: 1}, criteria)
    .then(result=> {
        console.debug(result);
        res.send("ok");
    })
    .catch(err => {
        console.error(err);
        res.send("err")
    })
})

module.exports = router;
