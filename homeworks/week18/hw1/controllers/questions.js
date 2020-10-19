/* eslint-disable consistent-return */
/* 負責管理後台問答新增/刪除/更新與渲染後台頁面 */
const db = require('../models');

const { Questions } = db;

const homeController = {
  newQuestion: (req, res, next) => {
    const {
      question,
      answer,
      question_number,
    } = req.body;

    Questions.create({
      question,
      answer,
      question_number,
    }).then(() => {
      res.redirect('/admin/questions');
    }).catch((err) => {
      console.log(err);
      res.redirect('/admin/questions');
    })
  },
  updateQuestion: (req, res, next) => {
    const {
      question,
      answer,
      question_number,
      id,
    } = req.body;
    Questions.findOne({
      where: {
        id,
      },
    }).then(questionData => (
      questionData.update({
        question,
        answer,
        question_number,
      })
    )).then(() => {
      res.redirect('/admin/questions');
    }).catch(() => {
      res.redirect('/admin/questions');
    });
  },
  deleteQuestion: (req, res, next) => {
    const id = req.params.id;
    Questions.findOne({
      where: {
        id,
      },
    }).then((question) => (
      question.destroy()
    )).then(() => {
      res.redirect('/admin/questions');
    }).catch((err) => {
      console.log(err);
      res.redirect('/admin/questions');
    });
  },
  renderAdminQuestionsPage: (req, res) => {
    Questions.findAll({
      order: [
        ['question_number', 'ASC'],
      ],
    }).then((questions) => {
      res.render('admin/questions', { questions });
    });
  },
  renderUserQuestionsPage: (req, res) => {
    Questions.findAll({
      order: [
        ['question_number', 'ASC'],
      ],
    }).then((questions) => {
      res.render('questions', { questions });
    });
  }

};

module.exports = homeController;
