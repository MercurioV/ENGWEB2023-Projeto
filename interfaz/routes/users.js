var express = require('express');
var router = express.Router();
var passport = require('passport')
var User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Na cb da homepage.")
  console.log(req.sessionID)
  res.render('index');
});

function verificaAutenticacao(req, res, next){
  console.log('User (verif.): ' + JSON.stringify(req.user))
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
    res.redirect("/users/login");
  }
}

router.get('/protegida', verificaAutenticacao, 
(req,res) => {
   			res.redirect('/rutes')
})

// Login page
router.get('/login', function(req, res) {
  console.log('Na cb do GET login...')
  console.log(req.sessionID)
  res.render('loginForm')
})
  
router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('Na cb do POST login...')
  console.log('Auth: ' + JSON.stringify(req.user))
 	res.redirect('/users/protegida')
})

//Log out
router.get("/logout",function(req,res){
  console.log("Logout")
  req.logout(()=>{
    return
  })
  res.redirect('/')
})

//Register
router.get('/register', function(req, res) {
  console.log('Na cb do GET login...')
  console.log(req.sessionID)
  res.render('registerForm')
})

router.post('/register',/**/function(req,res){
  console.log("post register")
  User.register(new User(
                {username:req.body.username,
                name:req.body.name,
                type:req.body.option}),
                req.body.password,
                function(err,user){
                  if(err){
                    console.log("Register error")
                    return res.render('register',{user:user});
                  }
                  else{
                    passport.authenticate('local')(req,res,function(){
                      res.redirect('/users/protegida')
                    })
                  }
                })
})


module.exports = router;

