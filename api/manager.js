let express = require('express');
let router = express.Router();
var Manager = require('../models').Manager;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const crypto = require('crypto');
const { where } = require('sequelize');

router
  .route('/manager')
  .get(function (req, res) {
    // 불러오기

    let type = req.query.type;

    if (type === 'session') {
      console.log('Session: ');

      if (req.session.loginInfo) {
        res.json({ info: req.session.loginInfo });
      } else {
        return res.status(401).json({
          error: 'THERE IS NO LOGIN DATA',
          code: 1,
        });
      }
    } else if (type === 'all') {
      // 전체 리스트
      console.log('들어오니');
      Manager.findAll({
        where: {
          fitness_no: {
            [Op.gt]: 1,
          },
        },
      })
        .then((managers) => {
          res.json(managers);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'search1') {
      //담당자이름
      Manager.findAll({
        where: {
          fitness_no: {
            [Op.gt]: 1,
          },
          manager_name: {
            [Op.like]: '%' + req.query.search + '%',
          },
        },
      })
        .then((managers) => {
          res.json(managers);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'search2') {
      //아이디
      Manager.findAll({
        where: {
          fitness_no: {
            [Op.gt]: 1,
          },
          id: {
            [Op.like]: '%' + req.query.search + '%',
          },
        },
      })
        .then((managers) => {
          res.json(managers);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'search3') {
      //전화번호
      Manager.findAll({
        where: {
          fitness_no: {
            [Op.gt]: 1,
          },
          phone: {
            [Op.like]: '%' + req.query.search + '%',
          },
        },
      })
        .then((managers) => {
          res.json(managers);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'idCheck') {
      //아이디
      Manager.findAll({
        where: {
          id: {
            [Op.like]: '%' + req.query.id + '%',
          },
        },
      })
        .then((managers) => {
          res.json(managers);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } else if (type === 'choiceFitness') {
      Manager.findAll({
        where: {
          fitness_no: req.query.fitness_no,
        },
      })
        .then((managers) => {
          res.json(managers);
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  })
  .post(function (req, res) {
    //  회원가입
    req.session.loginInfo = {};
    let type = req.query.type;

    // let first = crypto.createHash('sha1').update('test').digest('binary');
    // let second = crypto.createHash('sha1').update(first).digest('hex');
    // let result = "*"+second.toUpperCase();
    // console.log('!!!!!!!!',result)

    let pwd = req.body.password;
    let salt = Math.round(new Date().valueOf() * Math.random()) + '';
    let hashPassword = crypto
      .createHash('sha512')
      .update(pwd + salt)
      .digest('hex');
    //0:헬스장, 1:강사, 2:회원
    if (req.query.type === 'trainer') {
      Manager.create({
        id: req.body.id,
        password: hashPassword,
        manager_name: req.body.manager_name,
        salt: salt,
        loginWhether: 1,
        joinNo: req.body.joinNo,
      })
        .then(() => {
          // res.send({ success: "Trainer" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (req.query.type === 'client') {
      Manager.create({
        id: req.body.id,
        password: hashPassword,
        manager_name: req.body.manager_name,
        salt: salt,
        loginWhether: 2,
        joinNo: req.body.joinNo,
      })
        .then(() => {
          // res.send({ success: "client" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Manager.create({
        id: req.body.id,
        password: hashPassword,
        manager_name: req.body.manager_name,
        phone: req.body.phone,
        business_number: req.body.business_number,
        business_phone: req.body.business_phone,
        salt: salt,
        loginWhether: 0,
        joinNo: req.body.joinNo,
      })
        .then(() => {
          res.send({ success: 'Manager update!' });
        })
        .catch((err) => {
          console.error(err);
        });

      Manager.findOne({
        where: {
          id: req.body.id,
          //password: req.body.password
        },
      })
        .then((users) => {
          //나중에 비밀번호 암호화할 때 참고

          if (users == null) {
            console.log('err2');
            return res.status(401).json({
              error: '로그인 정보가 잘못되었습니다.',
              code: 2,
            });
          } else {
            let hashPassword = crypto
              .createHash('sha512')
              .update(req.body.password + users.salt)
              .digest('hex');
            if (hashPassword === users.password) {
              //console.log('성공')
              console.log('users :');
              console.log(users.dataValues.id);
              console.log(req.body.id);

              req.session.loginInfo = {
                id: req.body.id,
                fitness_no: users.dataValues.fitness_no,
                manager_name: users.dataValues.manager_name,
                loginWhether: users.dataValues.loginWhether,
                joinNo: users.dataValues.joinNo,
              };
              console.log(req.session);
              // RETURN SUCCESS
              return res.json({
                success: true,
                id: req.body.id,
                fitness_no: users.dataValues.fitness_no,
                loginWhether: users.dataValues.loginWhether,
                joinNo: users.dataValues.joinNo,
              });
              //res.json(users);
            } else {
              //console.log('실패')
              return res.status(401).json({
                error: '비밀번호가 잘못되었습니다.',
                code: 4,
              });
            }
          }
        })
        .catch((err) => {
          return res.status(401).json({
            error: '로그인 정보가 잘못되었습니다.',
            code: 3,
          });
        });
    }
  })
  .put(function (req, res) {
    if (req.query.type === 'choiceLogin') {
      Manager.update(
        {
          joinNo: req.body.joinNo,
        },
        {
          where: {
            id: req.query.id,
          },
        }
      )
        .then(() => {
          res.send({ success: 'update success!' });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      //trainer or client 수정하면 manager_name 수정
      Manager.update(
        {
          manager_name: req.body.manager_name,
          id: req.body.id,
        },
        {
          where: {
            joinNo: req.query.joinNo,
          },
        }
      )
        .then(() => {
          res.send({ success: 'update success!' });
        })
        .catch((err) => {
          console.error(err);
        });
    }

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
    let type = req.query.type;

    if (type === 'session') {
      req.session.destroy((err) => {
        if (err) throw err;
      });
      return res.json({ sucess: true });
    } else if (type === 'delete') {
      Manager.destroy({
        where: { fitness_no: req.query.fn },
      })
        .then((result) => {
          res.send('Delete the fitnessCenter');
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  });

module.exports = router;
