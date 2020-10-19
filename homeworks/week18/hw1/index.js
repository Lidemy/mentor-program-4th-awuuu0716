const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const indexController = require('./controllers/index');
const questionsController = require('./controllers/questions');
const prizesController = require('./controllers/prizes');
const adminController = require('./controllers/admin');
const productsController = require('./controllers/product');

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.SECRET;
const redirectBack = (req, res) => {
  res.redirect('back');
};
const checkPermission = (req, res, next) => {
  if (req.session.username !== 'admin') return res.redirect('/login');
  next()
};

app.set('view engine', 'ejs');
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
}));
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

// post area
// 註冊管理員用頁面, 網站上線時關閉此 route
app.post('/signup', adminController.signup, redirectBack);
app.post('/login', adminController.login, redirectBack);
app.post('/admin/products/newproduct', checkPermission, productsController.newProduct, redirectBack);
app.post('/admin/products/updateproduct', checkPermission, productsController.updateProduct, redirectBack);
app.post('/admin/questions/newquestion', checkPermission, questionsController.newQuestion, redirectBack);
app.post('/admin/questions/updatequestion', checkPermission, questionsController.updateQuestion, redirectBack);
app.post('/admin/prizes/newprize', checkPermission, prizesController.newPrize, redirectBack);
app.post('/admin/prizes/updateprize', checkPermission, prizesController.updatePrize, redirectBack);

// user area
app.get('/', indexController.renderIndexPage);
app.get('/questions', questionsController.renderUserQuestionsPage);
app.get('/menu', productsController.renderUserProductPage, redirectBack);
app.get('/prizes', prizesController.renderUserDrawPage);
app.get('/draw', prizesController.draw);

// admin area
app.get('/signup', adminController.renderSignupPage);
app.get('/login', adminController.renderLoginPage);
app.get('/logout', adminController.logout, redirectBack);
app.get('/admin', checkPermission, adminController.redirectToProducts);
app.get('/admin/products', checkPermission, productsController.renderAdminProductPage);
app.get('/admin/questions', checkPermission, questionsController.renderAdminQuestionsPage);
app.get('/admin/prizes', checkPermission, prizesController.renderAdminDrawPage);

// delete data area
app.get('/admin/products/delete/:id', checkPermission, productsController.deleteProduct, redirectBack);
app.get('/admin/questions/delete/:id', checkPermission, questionsController.deleteQuestion, redirectBack);
app.get('/admin/prizes/delete/:id', checkPermission, prizesController.deletePrize, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
