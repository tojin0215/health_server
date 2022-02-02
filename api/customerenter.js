/**
 * @author kkyubr
 */
let express = require('express');
let router = express.Router();
const CustomerEnter = require('../models').CustomerEnter;
const Customer = require('../models').Customer;
const Manager = require('../models').Manager;

const sequelize = require("sequelize");
const Op = sequelize.Op;

const jwt = require('jsonwebtoken');

const NOT_CHECKED = 0;
const TYPE_CUSTOMER = 'customer';
const TYPE_MANAGER = 'manager';
const JWT_SECRET_KEY = 'test';

router.route('/customerenter')
    .get(function (req, res) {

        const token = req.query.token;
        const fitness_no = req.query.fitness_no;

        if (!fitness_no) {res.status(400).json({message: 'no fitness_no'}); return;}

        if (!token) {
            CustomerEnter.findAll({
                limit: 10,
                where: {fitness_no: fitness_no},
                order: [['customer_enter_no', 'DESC']]
            })
            .then(result => {
                res.json(result);
                return;
            })
        }
        else {
            let decoded = {}
            try {decoded = jwt.verify(token, JWT_SECRET_KEY);}
            catch (err) {res.status(400).json({message: 'Bad Token'}); return;}

            const customer_enter = {
                fitness_no: decoded._fit_no,
                customer_no: decoded._id,
                is_checked: NOT_CHECKED,
                skey: decoded._type,
            }
            
            CustomerEnter.create(customer_enter)
            .then(() => {
                if (decoded._type === TYPE_CUSTOMER) {
                    Customer
                    .findAll({
                        where: {fitness_no: decoded._fit_no, member_no: decoded._id}})
                    .then(result => {
                        if (result.length === 0) {res.status(403).json({code: 403, message: '인증 실패'})}
                        else {
                            res.json({code: 200, message: '인증되었습니다.', user: result[0]});
                            
                            Customer.update({remained_membership: (result[0].remained_membership - 1)}, {where: {member_no: result[0].member_no}})
                            then(console.log).catch(console.error)
                        }
                        return;
                    })
                }
                else if (decoded._type === TYPE_MANAGER) {
                    Manager
                    .findAll({
                        where: {fitness_no: decoded._fit_no, member_no: decoded._id}})
                    .then(result => {
                        if (result.length === 0) {res.status(403).json({code: 403, message: '인증 실패'})}
                        else {res.json({code: 200, message: '인증되었습니다.', user: result[0]})}
                        return;
                    })
                }
            })
            .catch(err => {
                console.error(err);
                res.json({})
            })
        }
    })
    .post(function(req, res) {
        const b = req.body
        const type = req.query.type;
        const type2 = req.query.type2;
        const fitness_no = req.body.fitness_no;
        const member_no = req.body.customer_no;

        if (!b) {res.status(400).json({message: 'no body'}); return;}
        if (!type) {res.status(400).json({message: 'no type'}); return;}
        if (!type2) {res.status(400).json({message: 'no type2'}); return;}

        if (type === "check") {
            if (type2 === "customer") {
                console.log(b);
                Customer
                .findAll({where: {fitness_no, member_no}})
                .then(function (result) {
                    if (result.length === 0) {
                        res.status(404).json({code: 404, message: '회원을 찾을 수 없습니다.'});
                    }
                    else {
                        const token = jwt.sign({
                            _id: b.customer_no,
                            _fit_no: b.fitness_no,
                            _type: TYPE_CUSTOMER,
                        }, JWT_SECRET_KEY)
                        res.send({message: 'ok', token: token});
                    }
                })
            }
            else if (type2 === "manager") {
                Manager
                .findAll({
                    where: {fitness_no: b.fitness_no, id: b.manager_no}})
                .then(function (result) {
                    if (result.length === 0) {
                        res.json({code: 404, message: '회원을 찾을 수 없습니다.'})
                    }
                    else {
                        const token = jwt.sign({
                            _id: b.manager_no,
                            _fit_no: b.fitness_no,
                            _type: TYPE_MANAGER,
                        }, JWT_SECRET_KEY)
                        res.send({message: 'ok', token: token});
                    }
                })
            }
        }

    })
    .put(function(req, res) {
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
