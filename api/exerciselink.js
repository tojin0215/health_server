let express = require('express');
let router = express.Router();
var ExerciseLink = require('../models').User;

const sequelize = require("sequelize");
const Op = sequelize.Op;

router.route('/exerciselink')
    .get(function(req, res) {
        // 불러오기
        let type = req.query.type;
        ExerciseLink.findAll()
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    })
    .post(function(req, res) {
        // 쓰기
        ExerciseLink.create({
            /*member_no : 0,
            fitness_no: req.body.fitness_no,
            name: req.body.name,
            sex:  req.body.sex, 
            start_date: req.body.start_date,
            period: req.body.period,
            phone: req.body.phone,
            solar_or_lunar: req.body.solar_or_lunar,
            address: req.body.address,
            join_route: req.body.join_route,
            uncollected: req.body.uncollected,
            in_charge: req.body.in_charge,
            note: req.body.note,*/
        }).then(() => {
            res.send('Post the diary');
        })
        .catch((err) => {
            console.error(err);
        });
    })
    .put(function(req, res) {
        // 수정
        /*ExerciseLink.update({ title: "바꿀거 ", contents: "바꿀 내용1", mood : "바꿀 내용2", verse: "바꿀 내용3", }, { where: { writer: '권소령', year:2021, month:1, date:28 } })
        .then((result) => {
        res.send('Update the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/ 
    })
    .delete(function (req, res) {
        //삭제
        /*ExerciseLink.destroy({ where: { writer: "권소령", year:2021, month:1, date:14 } })
        .then((result) => {
        res.send('Delete the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
    });
module.exports = router;
