/* eslint-disable consistent-return */
/* 抽獎系統頁面渲染、抽獎 API、新增/刪除/編輯獎項 */
const db = require('../models');

const { Prizes } = db;

const drawController = {
  draw: (req, res) => {
    const pool = [];
    const prizesObj = {};
    Prizes.findAll()
      .then((prizes) => {
        prizes.forEach(prize => {
          const { prize_name } = prize;
          prizesObj[prize_name] = prize;
          for (let i = 0; i < prize.chance; i += 1) {
            pool.push(prize_name);
          }
        })
        const randomIndex = Math.floor(Math.random() * 100);
        const result = prizesObj[pool[randomIndex]];
        res.render('draw', { result });
      });
  },
  newPrize: (req, res, next) => {
    const {
      prize_name,
      description,
      imgUrl,
      chance,
    } = req.body;

    Prizes.create({
      prize_name,
      description,
      imgUrl,
      chance,
    }).then(() => {
      next();
    })
  },
  updatePrize: (req, res, next) => {
    const {
      id,
      prize_name,
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
        prize_name,
        description,
        imgUrl,
        chance,
      })
    )).then(() => {
      next();
    }).catch((err) => {
      console.log(err);
      next();
    });
  },
  deletePrize: (req, res, next) => {
    const id = req.params.id;
    Prizes.findOne({
      where: {
        id,
      },
    }).then(prize => (
      prize.destroy()
    )).then(() => {
      next();
    }).catch(() => {
      console.log(err);
      next();
    });
  },
  renderAdminDrawPage: (req, res) => {
    Prizes.findAll({
      order: [
        ['id', 'DESC'],
      ],
    }).then((prizes) => {
      res.render('admin/prizes', { prizes });
    });
  },
  renderUserDrawPage: (req, res) => {
    Prizes.findAll({
      order: [
        ['id', 'ASC'],
      ],
    }).then((prizes) => {
      res.render('prizes', { prizes });
    });
  },
};

module.exports = drawController;
