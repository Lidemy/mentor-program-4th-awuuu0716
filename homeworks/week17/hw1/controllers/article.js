/* eslint-disable consistent-return */
const db = require('../models');

const { Articles } = db;

const articleController = {
  getAll: (req, res) => {
    Articles.findAll({
      order: [
        ['id', 'DESC'],
      ],
    }).then((articles) => {
      res.render('index', { articles });
    });
  },
  get: (req, res) => {
    const { id } = req.params;
    Articles.findOne({
      where: {
        id,
      },
    }).then((article) => {
      if (!article) {
        res.redirect('/');
        return;
      }
      res.render('article', {
        article,
      });
    }).catch((err) => {
      console.log(err);
    });
  },
  edit: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    const {
      id,
      title,
      content,
      tags,
    } = req.body;
    Articles.findOne({
      where: {
        id,
      },
    }).then(article => (
      article.update({
        title,
        content,
        tags,
      })
    )).then(() => {
      res.redirect('/');
    }).catch(() => {
      res.redirect('/');
    });
  },

  addArticle: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    const {
      title,
      content,
      tags,
    } = req.body;

    Articles.create({
      title,
      content,
      tags,
    }).then(() => {
      res.redirect('/');
    });
  },
  renderAddPage: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    res.render('addArticle');
  },
  renderCategoryPage: (req, res) => {
    Articles.findAll({
      order: [
        ['id', 'DESC'],
      ],
    })
      .then((articles) => {
        res.render('category', {
          articles,
        });
      });
  },
  renderEditPage: (req, res, next) => {
    if (req.session.username !== 'admin') return next();
    const { id } = req.params;
    Articles.findOne({
      where: {
        id,
      },
    }).then((article) => {
      if (!article) {
        res.redirect('/');
        return;
      }
      res.render('editArticle', {
        article,
      });
    }).catch((err) => {
      console.log(err);
    });
  },
};

module.exports = articleController;
