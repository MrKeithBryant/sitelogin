const express = require('express');
const session = require('express-session');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

const app = express()
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views')
app.use(express.static('/'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(function(req, res, next) {
  req.session.users = req.session.users = {
    Edwin: 'bacon1',
    Jon: 'cheese',
    Josh: 'apple',

    }
  ;
  next();
})

app.get('/', function(req, res, next) {
  if (req.session.username) {
    res.send('Hello ' + req.session.username)
  } else {
    res.redirect('/login')
  }


});

app.get('/login', function(req, res, next) {
  res.render('sitelogin');
})

app.post('/login', function(req, res, next) {
  console.log(req.body);
  console.log(req.session.users[req.body.username]);
  if (req.session.users[req.body.username] === req.body.password) {
    req.session.username = req.body.username;
  }
    res.redirect('/');
});

app.listen(3000, function() {
  console.log("Open the F*****N door!")
});
