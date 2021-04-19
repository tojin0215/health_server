let express = require('express');
let router = express.Router();
var Exercise = require('../models').Exercise;

const sequelize = require("sequelize");
const Op = sequelize.Op;



router.route('/exercise')
    .get(function (req, res) {
        let type = req.query.type;
        let fitness_no = req.query.fn;
        let keyword = req.query.search;

        let clue = {
            where: {
                fitness_no: fitness_no,
            }
        }
        if (type==="search") {}
        else if (type==="search0") {clue['where']['name'] = {[Op.like]: "%" + keyword + "%"};}
        else if (type==="search1") {clue['where']['machine'] = {[Op.like]: "%" + keyword + "%"};}
        else if (type==="search2") {clue['where']['part'] = keyword;}
        else {}

        
        Exercise.findAll(clue)
        .then((exercise) => {
            res.json(exercise)
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
    })
    .post(function(req, res) {
        let b = req.body
        console.log({
            fitness_no: b.fitness_no,
            name: b.name,
            part: b.part,
            machine: b.machine,
            url: b.url,
            default_data_type: b.default_data_type,
            default_data: b.default_data,
            default_rest_second: b.default_rest_second,
            default_set_count: b.default_set_count,
            is_default: b.is_default,
        });

        Exercise.create({
            fitness_no: b.fitness_no,
            name: b.name,
            part: b.part,
            machine: b.machine,
            url: b.url,
            default_data_type: b.default_data_type,
            default_data: b.default_data,
            default_rest_second: b.default_rest_second,
            default_set_count: b.default_set_count,
            is_default: b.is_default,
        })
        .then(() => {
            res.send({message: 'ok'});
        })
        .catch((err) => {
            console.error(err);
        });
    })
    .put(function(req, res) {
        // 수정
        let b = req.body
        let type = b.type;
        let data = b.data;
        console.log(type, data);

        if (type==="set_default") {
            data.forEach(d => {
                Exercise.update(
                    {is_default: d[1]},
                    {where: {exercise_no: d[0]}}
                )
            })
            .then(() => {
                res.send({message: "okay"})
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
        } else {
            let target_name = b.target_name
            let target_data = b.target_data
            let update = {}
            update[target_name] = target_data
            Exercise.update(
                update,
                {
                    where: {
                        exercise_no: b.exercise_no,
                    }
                }
            )
            .then(() => {
                res.send('ok');
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
        }
        
        /*Exercise.update({ title: "바꿀거 ", contents: "바꿀 내용1", mood : "바꿀 내용2", verse: "바꿀 내용3", }, { where: { writer: '권소령', year:2021, month:1, date:28 } })
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
        /*Exercise.destroy({ where: { writer: "권소령", year:2021, month:1, date:14 } })
        .then((result) => {
        res.send('Delete the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
    });

module.exports = router;
