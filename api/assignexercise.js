let express = require('express');
let router = express.Router();
var AssignExercise = require('../models').AssignExercise;

const sequelize = require("sequelize");
const Op = sequelize.Op;

router.route('/assignexercise')
    .get(function(req, res) {
        // 불러오기
        let type = req.query.type;
        let fitness_no = req.query.fitness_no;
        let member_no = req.query.member_no;

        let clue = {
            where: {
                fitness_no: fitness_no,
                member_no: member_no,
            }
        }
        if (type === "all") {}
        else if (type === "member") {
            clue = {
                fitness_no: fitness_no,
                member_no: member_no,
            }
        }
        else {}

        AssignExercise.findAll(clue)
        .then((exercise) => {
            res.json(exercise)
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
    })
    .post(function(req, res) {
        // 쓰기
        AssignExercise.create({
            exercise_no: b.exercise_no,
            fitness_no: b.fitness_no,
            member_no: b.member_no,
            group_no: b.group_no,
            name: b.name,
            part: b.part,
            machine: b.machine,
            url: b.url,
            data_type: b.data_type,
            data: b.data,
            rest_second: b.rest_second,
            set_count: b.set_count,
        })
        .then(() => {
            res.send('ok');
        })
        .catch((err) => {
            console.error(err);
        });
    })
    .put(function(req, res) {
        // 수정
        /*AssignExercise.update({ title: "바꿀거 ", contents: "바꿀 내용1", mood : "바꿀 내용2", verse: "바꿀 내용3", }, { where: { writer: '권소령', year:2021, month:1, date:28 } })
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
        /*AssignExercise.destroy({ where: { writer: "권소령", year:2021, month:1, date:14 } })
        .then((result) => {
        res.send('Delete the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
    });

module.exports = router;
