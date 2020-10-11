/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const db = require('../models');

const { Articles, Users } = db;
const saltRounds = 10;

const adminController = {
  signUp: (req, res) => {
    const {
      userName,
      password,
    } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return;
      Users.create({
        userName,
        password: hash,
      }).then(() => {
        res.redirect('/');
      });
    });
  },
  deleteArticle: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    const {
      id,
    } = req.body;
    Articles.findOne({
      where: {
        id,
      },
    }).then(article => (
      article.deleted ? article.update({ deleted: 0 }) : article.update({ deleted: 1 })
    )).then(() => {
      res.redirect('/admin');
    }).catch(() => {
      res.redirect('/admin');
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
          req.flash('errorMessage', '密碼錯誤');
          return next();
        }
        req.session.username = username;
        res.redirect('/');
      });
    });
  },
  logout: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    req.session.username = null;
    return next();
  },
  renderLoginPage: (req, res) => {
    res.render('login');
  },
  renderSignupPage: (req, res, next) => {
    res.render('signUp');
  },
  renderAdminPage: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    Articles.findAll({
      order: [
        ['id', 'DESC'],
      ],
    })
      .then((articles) => {
        res.render('admin', {
          articles,
        });
      });
  },
};

module.exports = adminController;
