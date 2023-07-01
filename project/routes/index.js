var express = require('express');
var router = express.Router();
var Rute= require('../controllers/rute');
var House= require('../controllers/house')

router.get('/api/rutes', function(req, res, next) {
    // Adding Pagination
    const limitValue = req.query.limit || 6;
    const skipValue = req.query.skip || 0;
    Rute.list(limitValue,skipValue)
    .then(Rutes => {
      res.jsonp(Rutes)
    })
    .catch(erro => {
      res.json({ error: err })
    })
  })

router.get('/api/rutes/search/:nome',function(req, res, next) {
  nome = req.params.nome
  Rute.findRute(nome)
    .then(Rute => {
      res.jsonp(Rute)
    })
    .catch(erro => {
      res.json({ error: err })
    })
})

router.get('/api/rutes/filter/:type/:values', function(req, res, next) {
  Rute.filteredList(req.params.type,req.params.values.replace("%20", " ").split(","))
    .then(Rutes => {
      res.jsonp(Rutes)
    })
    .catch(erro => {
      res.json({ error: err })
    })
});

router.get('/api/rutes/:id', function(req, res) {
  Rute.getRute(req.params.id)
    .then(Rute => {
      res.jsonp(Rute)
    })
    .catch(erro => {
      res.json({ error: err })
    })
});

router.post('/api/addRute', function(req, res) {
  Rute.addRute(req.body)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      res.json({ error: err })
    })
})

router.get('/api/rutes/:id/:house', function(req,res){
  House.getHouse(req.params.house)
  .then(house => {
    res.jsonp(house)
  })
  .catch(erro => {
    res.json({ error: err })
  })
})


router.get('/api/rutes/:id/comment/:com', function(req,res){
  console.log(req.params.com)
  Rute.getComment(req.params.id,req.params.com)
  .then(comment => {
    console.log(comment)
    res.jsonp(comment)
  })
  .catch(erro => {
    res.json({ error: err })
  })
})

router.post('/api/rutes/:id/comments', function(req, res) {
  Rute.addComment(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

router.delete('/api/rutes/:id/deleteComment/:com', function(req, res) {
  Rute.deleteComment(req.params.id, req.params.com)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

router.delete('/api/rutes/:id/:house/deleteComment/:comment', function(req, res) {
  House.deleteCommentHouse(req.params.house, req.params.comment)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

router.post('/api/rutes/:id/photos', function(req, res) {
  Rute.addPhoto(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

router.post('/api/rutes/:id/houses', function(req, res) {
  Rute.addHouse(req.params.id,{
    _id: req.body.id,
    numero: req.body.numero
  })
    .then(dados => {
      House.addHouse({
        _id: req.body.id,
        numero: req.body.numero,
        enfiteuta: req.body.enfiteuta,
        foro: req.body.foro,
        rua: req.params.id
      })
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})
router.post('/api/rutes/:id/:idHouse/addComment', function (req, res) {
  House.addCommentHouse(req.params.idHouse, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

// DELETE a house
router.delete('/api/rutes/:id/deleteHouse/:house', function(req, res) {
  Rute.deleteHouse(req.params.id, req.params.house)
    .then(dados => {
      House.deleteHouse(req.params.house)
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

router.post('/api/rutes/:id/updateHouse/:house', function(req, res) {
  House.updateHouse(req.params.id, req.params.house,req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

router.post('/api/rutes/:id/updateComment/:com', function(req, res) {
  Rute.updateComment(req.params.id, req.params.com,req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

router.get('/api/rutes/:id/:house/:comment', function(req, res) {
  House.getComment(req.params.house,req.params.comment)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})

router.post('/api/rutes/:id/:house/updateComment/:com', function(req, res) {
  House.updateComment(req.params.house, req.params.com,req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})
module.exports = router;