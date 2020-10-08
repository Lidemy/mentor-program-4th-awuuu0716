const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const articleController = require('./controllers/article');
const adminController = require('./controllers/admin');

const app = express();
const port = 3000;
const redirectBack = (req, res) => {
  res.redirect('back');
};

app.set('view engine', 'ejs');
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

app.post('/addArticle', articleController.addArticle, redirectBack);
app.post('/editArticle', articleController.edit, redirectBack);
app.post('/admin/delete', adminController.deleteArticle, redirectBack);
app.post('/signup', adminController.signUp, redirectBack);
app.post('/login', adminController.login, redirectBack);

app.get('/', articleController.getAll);
app.get('/addArticle', articleController.renderAddPage, redirectBack);
app.get('/article/:id', articleController.get);
app.get('/edit/:id', articleController.renderEditPage, redirectBack);
app.get('/admin', adminController.renderAdminPage, redirectBack);
app.get('/login', adminController.renderLoginPage);
app.get('/signup', adminController.renderSignupPage, redirectBack);
app.get('/logout', adminController.logout, redirectBack);
app.get('/category', articleController.renderCategoryPage);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
