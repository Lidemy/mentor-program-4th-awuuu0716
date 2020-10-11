/* eslint-disable consistent-return */
const db = require('../models');

const { Prizes } = db;

const prizeController = {
  draw: (req, res) => {
    const pool = [];
    const prizesObj = {};
    Prizes.findAll()
    .then((prizes) => {
      prizes.forEach(prize => {
        const { prizeName } = prize;
        prizesObj[prizeName] = prize;
        for ( let i = 0; i < prize.chance; i += 1) {
          pool.push(prizeName)
        }
      })
      const randomIndex = Math.floor(Math.random() * 100);
      const result = prizesObj[pool[randomIndex]]
      res.send(JSON.stringify(result));
    });
  },

  renderHomePage: (req, res) => {
    res.render('index');
  },
};

module.exports = prizeController;
