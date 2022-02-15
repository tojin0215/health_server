const express = require('express');
const router = express.Router();
const Profile = require('../models').Profile;
const Customer = require('../models').Customer;

const sequelize = require("sequelize");
const Op = sequelize.Op;

router
.route('/profiles')
.get(function(req, res) {
    const member_no = req.query.member_no;
    
    Profile.findAll({
        where: {profile_owner_id: member_no}
    })
    .then((results) => {
        if (results.length === 0) {
            Customer.findAll({
                where: {member_no: member_no}
            })
            .then(customers => {
                if (customers.length <= 0) res.send({message: "사용자 없음"})
                else {
                    const customer = customers[0];
                    Profile.create({
                        //member_no : 0,
                        profile_owner_id: member_no,
                        profile_name: customer.name,
                        profile_phone: customer.phone,
                        // profile_age: customer.name,
                        profile_age: 0,
                        profile_sex: customer.sex,
                    })
                    .then(profile => res.send([profile]))
                }
            })
            
        } else {
            res.json(results);
        }
    })
    .catch((err) => {
        console.error(err);
        res.json({err: err});
    });
})
.post(function(req, res) {
    // 쓰기
    Profile.create({
        //member_no : 0,
        profile_owner_id: req.body.profile_owner_id,
        profile_name: req.body.profile_name,
        profile_phone: req.body.profile_phone, 
        profile_age: req.body.profile_age, 
        profile_sex: req.body.profile_sex, 
    }).then(() => {
        Profile.findAll({
            where: {profile_owner_id: req.body.profile_owner_id}
        })
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            console.error(err);
            res.json({err: err});
        });
    })
    .catch((err) => {
        console.error(err);
        res.json({})
    });
})
.put(function(req, res) {
    // const criteria = {
    //     where: {
    //         profile_id: req.body.profile_id,
    //     }
    // }

    // Alert.update({confirm: 1}, criteria)
    // .then(result=> {
    //     console.debug(result);
    //     res.send("ok");
    // })
    // .catch(err => {
    //     console.error(err);
    //     res.send("err")
    // })
})
.delete(function (req, res) {
    //삭제
    const profile_id = req.query.profile_id;
    
    Profile.destroy({
        where: {
            profile_id: profile_id,
        }
    })
    .then(result => res.send({message: "delete", result: result}))
    .catch(err => {
        console.error(err);
        next(err);
    })
});


module.exports = router;