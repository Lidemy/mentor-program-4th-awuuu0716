/* eslint-disable consistent-return */
/* 負責管理後台產品新增/刪除/更新與渲染後台頁面 */
const db = require('../models');

const { Products } = db;

const productsController = {
  newProduct: (req, res, next) => {
    const {
      product_name,
      product_price,
      product_url,
    } = req.body;

    Products.create({
      product_name,
      product_price,
      product_url,
    }).then(() => {
      next();
    });
  },
  updateProduct: (req, res, next) => {
    const {
      product_name,
      product_price,
      product_url,
      id,
    } = req.body;
    Products.findOne({
      where: {
        id,
      },
    }).then(product => (
      product.update({
        product_name,
        product_price,
        product_url,
      })
    )).then(() => {
      next();
    }).catch((err) => {
      console.log(err);
      next();
    });
  },
  deleteProduct: (req, res, next) => {
    const id = req.params.id;
    Products.findOne({
      where: {
        id,
      },
    }).then((product) => {
      return product.destroy()
    }).then(() => {
      next();
    }).catch((err) => {
      console.log(err);
      next();
    });
  },
  renderAdminProductPage: (req, res) => {
    Products.findAll({
      order: [
        ['id', 'DESC'],
      ],
    }).then((products) => {
      res.render('admin/products', { products });
    });
  },
  renderUserProductPage: (req, res) => {
    Products.findAll({
      order: [
        ['id', 'DESC'],
      ],
    }).then((products) => {
      res.render('menu', { products });
    });
  }
};

module.exports = productsController;
