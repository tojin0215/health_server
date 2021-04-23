let express = require('express');
let router = express.Router();
var Manager = require('../models').Manager;
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.route('/manager')
    .get(function(req, res) {
        // 불러오기
        console.log("Session: ");
        
        if(req.session.loginInfo) {
            res.json({ info: req.session.loginInfo });
        }
        else{
            return res.status(401).json({
                error: "THERE IS NO LOGIN DATA",
                code: 1
            });
        }
        
    })
    .post(function(req, res) {
        // 쓰기
        req.session.loginInfo = {}
        let type = req.query.type;
        Manager.findOne({
            where: {
              id: req.body.id,
              password: req.body.password
            }
          })
            .then((users) => {
                //나중에 비밀번호 암호화할 때 참고
                // const validate = hasher({password:req.body.password, salt:account.salt}, function(err, pass, salt, hash){
                // if(hash === account.password){}
                // })
                if(users==null){
                    console.log('err2');
                    return res.status(401).json({
                        error: "로그인 정보가 잘못되었습니다.",
                        code: 2
                    });
                }
                else{
                    console.log("users :");
                    console.log(users.dataValues.id);
                    console.log(req.body.id);
                    req.session.loginInfo = {
                        id: req.body.id,
                        fitness_no:users.dataValues.fitness_no,
                        fitness_name:users.dataValues.fitness_name,
                        manager_name:users.dataValues.manager_name
                    };
                    console.log(req.session)
                    // RETURN SUCCESS
                    return res.json({
                        success: true,
                        id: req.body.id,
                        fitness_no:users.dataValues.fitness_no,
                        fitness_name:users.dataValues.fitness_name,
                        manager_name:users.dataValues.manager_name
                    });
                    //res.json(users);
                }
            })
            .catch((err) => {
                return res.status(401).json({
                    error: "로그인 정보가 잘못되었습니다.",
                    code: 3
                });
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
        req.session.destroy(err => { if(err) throw err; });
        return res.json({ sucess: true });
    });

module.exports = router;
