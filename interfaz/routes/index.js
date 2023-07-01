var express = require('express');
var router = express.Router();
var env = require('../config/env');
var axios = require('axios');
var multer = require('multer')
var upload = multer({dest: 'uploads'})
var fs = require('fs')
var uuid = require('uuid')

router.get('/', function(req, res, next) {
  res.redirect('/users')
})
/* GET home page. */
router.get('/rutes', function(req, res, next) {
  const limitValue = req.query.limit || 6;
  const skipValue = req.query.skip || 0;
  const previousVal = 0;
  if(parseInt(skipValue) > 0){
    const previousVal = parseInt(skipValue)-6;
  }
  const nextVal = parseInt(skipValue)+6;

  axios.get(env.apiAccessPoint+"/rutes/?skip="+skipValue)
    .then(response => {
      res.render('rutes', { list: response.data, d: skipValue, previous: previousVal, next: nextVal, user:req.user.type});
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

router.post('/rutes',function(req,res, next){
  res.redirect('/rutes/filter/'+req.body.option+'/'+req.body.values)
})

router.post('/rutes/search',function(req,res,next){
  url = env.apiAccessPoint+"/rutes/search/"+req.body.searchVal
  axios.get(url)
    .then(response =>{
      res.render('viewRute', {id:response.data.id, rute: response.data, user:req.user.type})
    })
    .catch(err => {
      res.render('error', {error: err})
    })
})

router.get('/rutes/filter/:option/:value',function(req,res,next) {
  const limitValue = req.query.limit || 6;
  const skipValue = req.query.skip || 0;
  const previousVal = 0;
  if(parseInt(skipValue) > 0){
    const previousVal = parseInt(skipValue)-6;
  }
  const nextVal = parseInt(skipValue)+6;

  url = env.apiAccessPoint+"/rutes/filter/"+req.params.option+"/"+req.params.value
  axios.get(url)
    .then(response => {
      res.render('rutesFiltered', { list: response.data, d: skipValue, previous: previousVal, next: nextVal, optionV:req.params.option,valueV:req.params.value});
    })
    .catch(err => {
      res.render('error', {error: err})
    })
})
/* GET addRute. */
router.get('/rutes/addRute', function(req, res, next) {
  res.render('addRute');
});
router.post('/rutes/addRute', upload.single('myFile'), (req, res) => {
  let oldPath = __dirname + '/../' + req.file.path 
  let newPath = __dirname + '/../public/images/uploads/imagem/' + req.file.originalname

  fs.rename(oldPath, newPath, erro => {
    if(erro) console.log(erro)
  })

  axios.post(env.apiAccessPoint+"/addRute", {
    _id: req.body.id,
    nome: req.body.nome,
    figura: [{
        imagem: req.file.originalname,
        legenda:req.body.description
    }],
    comments:[],
    listaCasas:[]
  })
  .then(function (response) {
    res.redirect('/rutes')
  })
  .catch(function (error) {
    console.log(error);
  });
});
/* GET rute page. */
router.get('/rutes/:id', function(req, res, next) {
  axios.get(env.apiAccessPoint+"/rutes/"+req.params.id)
    .then(response => {
      console.log(response.data)
      res.render('viewRute', {id:req.params.id, rute: response.data, user:req.user.type});
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});
/* GET addComment for rute page. */
router.get('/rutes/:id/addComment/:size', function(req, res, next) {
      res.render('addComment', { rute: req.params.id});
});
// POST comment 
router.post('/rutes/:id/addComment/:size', function(req, res, next) {
  axios.post(env.apiAccessPoint+"/rutes/"+req.params.id+"/comments", {
    _id: uuid.v4(),
    data: req.body.data.split(','),
    entidade: req.body.entidade.split(','),
    text: req.body.text,
    lugar: req.body.lugar.split(',')
  })
  .then(function (response) {
    res.redirect('/rutes/'+req.params.id)
  })
  .catch(function (error) {
    console.log(error);
  });
});
/* GET addHouse for rute page. */
router.get('/rutes/:id/addHouse', function(req, res, next) {
  res.render('addHouse', { rute: req.params.id});
});

// POST house 
router.post('/rutes/:id/addHouse', function(req, res, next) {
  axios.post(env.apiAccessPoint+"/rutes/"+req.params.id+"/houses", {
    id: uuid.v4(),
    numero : parseInt(req.body.numero),
    enfiteuta : req.body.enfiteuta,
    foro : req.body.foro
  })
  .then(function (response) {
  res.redirect('/rutes/'+req.params.id)
  })
  .catch(function (error) {
  console.log(error);
  });
});
router.get('/rutes/:id/:idHouse/addComment/', function(req, res, next) {
  res.render('addCommentHouse', { rute: req.params.id, house: req.params.idHouse});
})

// POST comment 
router.post('/rutes/:id/:idHouse/addComment/', function(req, res, next) {
  axios.post(env.apiAccessPoint+"/rutes/"+req.params.id+"/"+req.params.idHouse+"/addComment", {
    _id: uuid.v4(),
    data: req.body.data.split(','),
    entidade: req.body.entidade.split(','),
    text: req.body.text,
    lugar: req.body.lugar.split(',')
  })
  .then(function (response) {
  res.redirect('/rutes/'+req.params.id)
  })
  .catch(function (error) {
  console.log(error);
  });
});

/* GET addHouse for rute page. */
router.get('/rutes/:id/addPhoto', function(req, res, next) {
  res.render('addPhoto');
});

// POST photo 
router.post('/rutes/:id/addPhoto', upload.single('myFile'),function(req, res, next) {
  let oldPath = __dirname + '/../' + req.file.path 
  let newPath = __dirname + '/../public/images/uploads/imagem/' + req.file.originalname

  fs.rename(oldPath, newPath, erro => {
    if(erro) console.log(erro)
  })

  axios.post(env.apiAccessPoint+"/rutes/"+req.params.id+"/photos", {
    imagem: req.file.originalname,
    legenda:req.body.description
  })
  .then(function (response) {
  res.redirect('/rutes/'+req.params.id)
  })
  .catch(function (error) {
  console.log(error);
  });
});

router.get('/rutes/:id/deleteComment/:comment',function(req,res,next){
  axios.delete(env.apiAccessPoint+"/rutes/"+req.params.id+"/deleteComment/"+req.params.comment)
  .then(function (response) {
    res.redirect('/rutes/'+req.params.id)
    })
    .catch(function (error) {
    console.log(error);
    });
})

router.get('/rutes/:id/deleteHouse/:house',function(req,res,next){
  axios.delete(env.apiAccessPoint+"/rutes/"+req.params.id+"/deleteHouse/"+req.params.house)
  .then(function (response) {
    res.redirect('/rutes/'+req.params.id)
    })
    .catch(function (error) {
    console.log(error);
    });
})

router.get('/rutes/:id/:house/deleteComment/:comment',function(req,res,next){
  axios.delete(env.apiAccessPoint+"/rutes/"+req.params.id+"/"+req.params.house+"/deleteComment/"+req.params.comment)
  .then(function (response) {
    res.redirect('/rutes/'+req.params.id+"/"+req.params.house)
    })
    .catch(function (error) {
    console.log(error);
    });
})

router.get("/rutes/:id/:house/updateComment/:comment",function(req,res,next) {
  axios.get(env.apiAccessPoint+"/rutes/"+req.params.id+"/"+req.params.house+"/"+req.params.comment)
  .then(response => {
    response.data.data = response.data.data.join(",")
    response.data.lugar = response.data.lugar.join(",")
    response.data.entidade = response.data.entidade.join(",")
    res.render('updateCommentHouse', {comment:response.data, house: req.params.house});
  })
  .catch(err => {
    res.render('error', {error: err})
  })
})

router.post("/rutes/:id/:house/updateComment/:comment",function(req,res,next) {
  console.log("post")
  axios.post(env.apiAccessPoint+"/rutes/"+req.params.id+"/"+req.params.house+"/updateComment/"+req.params.comment, {
    _id: req.params.comment,
    data: req.body.data.split(','),
    entidade: req.body.entidade.split(','),
    text: req.body.text,
    lugar: req.body.lugar.split(',')
  })
  .then(function (response) {
    res.redirect('/rutes/'+req.params.id+"/"+req.params.house)
  })
  .catch(function (error) {
    console.log(error);
  });
})
router.get('/rutes/:id/:house',function(req,res,next){
  axios.get(env.apiAccessPoint+"/rutes/"+req.params.id+"/"+req.params.house)
  .then(response => {
    res.render('viewHouses', {house:response.data, rute: req.params.id, user:req.user.type});
  })
  .catch(err => {
    res.render('error', {error: err})
  })
})

router.get("/rutes/:id/updateHouse/:house",function(req,res,next) {
  axios.get(env.apiAccessPoint+"/rutes/"+req.params.id+"/"+req.params.house)
  .then(response => {
    res.render('updateHouse', {house:response.data, rute: req.params.id});
  })
  .catch(err => {
    res.render('error', {error: err})
  })
})

router.post("/rutes/:id/updateHouse/:house",function(req,res,next) {
  axios.post(env.apiAccessPoint+"/rutes/"+req.params.id+"/updateHouse/"+req.params.house, {
    _id : req.params.id+"_"+req.params.house,
    enfiteuta : req.body.enfiteuta,
    foro : req.body.foro
  })
  .then(response => {
    res.redirect('/rutes/'+req.params.id)
  })
  .catch(err => {
    res.render('error', {error: err})
  })
})

router.get("/rutes/:id/updateComment/:com",function(req,res,next) {
  axios.get(env.apiAccessPoint+"/rutes/"+req.params.id+"/comment/"+req.params.com)
  .then(response => {
    response.data.data = response.data.data.join(",")
    response.data.lugar = response.data.lugar.join(",")
    response.data.entidade = response.data.entidade.join(",")
    res.render('updateComment', {comment:response.data, rute: req.params.id});
  })
  .catch(err => {
    res.render('error', {error: err})
  })
})

router.post("/rutes/:id/updateComment/:com",function(req,res,next) {
  axios.post(env.apiAccessPoint+"/rutes/"+req.params.id+"/updateComment/"+req.params.com, {
    _id: req.params.com,
    data: req.body.data.split(','),
    entidade: req.body.entidade.split(','),
    text: req.body.text,
    lugar: req.body.lugar.split(',')
  })
  .then(function (response) {
    res.redirect('/rutes/'+req.params.id)
  })
  .catch(function (error) {
    console.log(error);
  });
})
module.exports = router;