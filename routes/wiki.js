const wikiRouter = require('express').Router();
const bodyParser = require('body-parser');
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

wikiRouter.use(bodyParser.urlencoded({
    extended: true
}));

wikiRouter.use(bodyParser.json());

wikiRouter.get('/', function(req, res, next) {
    res.redirect('/');
})

wikiRouter.post('/', function(req, res, next) {
    
    var page = Page.build({
        title: req.body.title,
        content: req.body.content
    });
    page.save()
    .then(function(){
        res.json(page);
    })
})



wikiRouter.get('/add', function(req, res, next) {
    res.render('addpage');
})


module.exports = wikiRouter;