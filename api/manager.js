let express = require('express');
let router = express.Router();
var Manager = require('../models').Manager;

const sequelize = require("sequelize");
const Op = sequelize.Op;

router.route('/manager')
    .get(function(req, res) {
        // 불러오기
        console.log("GET");
        console.log(req);
        let type = req.query.type;
        Manager.findAll()
            .then((users) => {
                console.log(users);
                res.json(users);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    })
    .post(function(req, res) {
        // 쓰기
        let type = req.query.type;
        Manager.findAll({
            where: {
              id: req.body.id,
              password: req.body.password
            }
          })
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    })
    .put(function(req, res) {
        // 수정
        /*User.update({ title: "바꿀거 ", contents: "바꿀 내용1", mood : "바꿀 내용2", verse: "바꿀 내용3", }, { where: { writer: '권소령', year:2021, month:1, date:28 } })
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
        /*User.destroy({ where: { writer: "권소령", year:2021, month:1, date:14 } })
        .then((result) => {
        res.send('Delete the diary');
        })
        .catch((err) => {
        console.error(err);
        next(err);
        });*/
    });

module.exports = router;
