/* eslint-disable consistent-return */
/* 負責登入登出 管理員進入後台時重新導向至 admin/products 頁面*/ 
const bcrypt = require('bcrypt');
const db = require('../models');

const { Users } = db;
const saltRounds = 10;

const adminController = {
  signup: (req, res) => {
    const {
      username,
      password,
    } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return;
      Users.create({
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
    Users.findOne({
      where: {
        username,
      },
    }).then((userData) => {
      bcrypt.compare(password, userData.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMessage', '帳號密碼錯誤');
          return next();
        }
        req.session.username = username;
        res.redirect('/');
      });
    }).catch(() => {
      req.flash('errorMessage', '帳號密碼錯誤');
      return next();
    })
  },
  logout: (req, res, next) => {
    req.session.username = null;
    return next();
  },
  renderLoginPage: (req, res) => {
    res.render('admin/login');
  },
  renderSignupPage: (req, res, next) => {
    res.render('admin/signup');
  },
  redirectToProducts: (req, res) => {
    res.redirect('/admin/products');
  },
};

module.exports = adminController;
