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
        else if (type==="search2") {
            let arr = []
            part_num = Number(keyword)
            if (part_num!==16 && part_num!==8 && part_num!==4 && part_num!==2 && part_num!==1) {
                clue['where']['part'] = part_num
            } else {
                if (part_num===1) {
                    arr = [
                        {part: 1},
                        {part: 1+2},
                        {part: 1+2+4},
                        {part: 1+2+4+8},
                        {part: 1+2+4+8+16},
                        {part: 1+4},
                        {part: 1+4+8},
                        {part: 1+4+8+16},
                        {part: 1+8},
                        {part: 1+8+16},
                        {part: 1+16}
                    ]
                }
                if (part_num===2) {
                    arr = [
                        {part: 2},
                        {part: 2+1},
                        {part: 2+1+4},
                        {part: 2+1+4+8},
                        {part: 2+1+4+8+16},
                        {part: 2+4},
                        {part: 2+4+8},
                        {part: 2+4+8+16},
                        {part: 2+8},
                        {part: 2+8+16},
                        {part: 2+16}
                    ]
                }
                if (part_num===4) {
                    arr = [
                        {part: 4},
                        {part: 4+1},
                        {part: 4+1+2},
                        {part: 4+1+2+8},
                        {part: 4+1+2+8+16},
                        {part: 4+2},
                        {part: 4+2+8},
                        {part: 4+2+8+16},
                        {part: 4+8},
                        {part: 4+8+16},
                        {part: 4+16}
                    ]
                }
                
                if (part_num===8) {
                    arr = [
                        {part: 8},
                        {part: 8+1},
                        {part: 8+1+2},
                        {part: 8+1+2+4},
                        {part: 8+1+2+4+16},
                        {part: 8+2},
                        {part: 8+2+4},
                        {part: 8+2+4+16},
                        {part: 8+4},
                        {part: 8+4+16},
                        {part: 8+16}
                    ]
                }
                
                if (part_num===16) {
                    arr = [
                        {part: 16},
                        {part: 16+1},
                        {part: 16+1+2},
                        {part: 16+1+2+4},
                        {part: 16+1+2+4+8},
                        {part: 16+2},
                        {part: 16+2+4},
                        {part: 16+2+4+8},
                        {part: 16+4},
                        {part: 16+4+8},
                        {part: 16+8}
                    ]
                }
                let arr2 = []
                arr.forEach(function(p){
                    arr2.push(p['part'])
                });
                console.log(arr);
                
                // clue['where']['part'] = {[Op.like]: {[Op.in]: arr2}};
                clue['where']['part'] = {[Op.in]: arr2};
            }
        }
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
                .then(() => {console.error("okay");})
                .catch((err) => {
                    console.error(err);
                    next(err);
                });
            })
            res.send({message: "okay"});
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
                console.error('error');
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
