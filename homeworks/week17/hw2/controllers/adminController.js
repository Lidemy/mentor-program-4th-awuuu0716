/* eslint-disable consistent-return */
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Admin, Prizes } = db;

const prizeController = {
  signUp: (req, res) => {
    const {
      username,
      password,
    } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return;
      Admin.create({
        username,
        password: hash,
      }).then(() => {
        res.redirect('/');
      });
    });
  },
  login: (req, res, next) => {
    const {
      username,
      password,
    } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    Admin.findOne({
      where: {
        username,
      },
    }).then((userData) => {
      bcrypt.compare(password, userData.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMessage', '密碼錯誤');
          return next();
        }
        req.session.username = username;
        res.redirect('/');
      });
    });
  },
  addPrize: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    const {
      prizeName,
      description,
      imgUrl,
      chance,
    } = req.body;

    Prizes.create({
      prizeName,
      description,
      imgUrl,
      chance,
    }).then(() => {
      res.redirect('/admin');
    })
  },
  editPrize: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    const {
      id,
      prizeName,
      description,
      imgUrl,
      chance,
    } = req.body;
    Prizes.findOne({
      where: {
        id,
      },
    }).then(prize => (
      prize.update({
        prizeName,
        description,
        imgUrl,
        chance,
      })
    )).then(() => {
      next();
    }).catch(() => {
      next();
    });
  },
  deletePrize: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    const {
      id,
    } = req.body;
    Prizes.findOne({
      where: {
        id,
      },
    }).then(prize => (
      prize.destroy()
    )).then(() => {
      next();
    }).catch(() => {
      next();
    });
  },
  logout: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    req.session.username = null;
    return next();
  },
  renderSignUpPage: (req, res) => {
    res.render('signup');
  },
  renderLoginPage: (req, res) => {
    res.render('login');
  },
  renderAdminPage: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    Prizes.findAll()
      .then((prizes) => {
        res.render('admin', {
          prizes
        });
      });
  },
};

module.exports = prizeController;
