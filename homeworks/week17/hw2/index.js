const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const prizeController = require('./controllers/prizeController');
const adminController = require('./controllers/adminController');

const app = express();
const port = process.env.PORT || 3000;
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

app.post('/addPrize', adminController.addPrize, redirectBack);
app.post('/signup', adminController.signUp);
app.post('/login', adminController.login);
app.post('/editPrize', adminController.editPrize, redirectBack)
app.post('/deletePrize', adminController.deletePrize, redirectBack)

app.get('/', prizeController.renderHomePage);
app.get('/draw', prizeController.draw);
app.get('/signup', adminController.renderSignUpPage);
app.get('/login', adminController.renderLoginPage);
app.get('/logout', adminController.logout, redirectBack);
app.get('/admin', adminController.renderAdminPage, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
