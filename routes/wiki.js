const wikiRouter = require('express').Router();
const bodyParser = require('body-parser');
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.use(bodyParser.urlencoded({
    extended: true
}));

wikiRouter.use(bodyParser.json());

wikiRouter.post('/', function(req, res, next) {

    var page = Page.build({
        title: req.body.title,
        content: req.body.content
    });
    page.save()
        //.then(function() {
        //  res.json(page);
        //})
        .then(function(savedPage) {
            res.redirect(savedPage.route)
        })
        .catch(next)
})


wikiRouter.get('/add', function(req, res, next) {
    res.render('addpage');
})

wikiRouter.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
            where: {
                urlTitle: req.params.urlTitle
            }
        })
        .then(function(foundPage) {
            // console.log("TITLE!!!!!!", req.body.title, "CONTENT!!!!!!", req.body.content, "FOUNDPAGE", foundPage)
            console.log(foundPage)
            res.render("wikipage", {
                page: foundPage
            });
            //res.json(foundPage.urlTitle)
        })
        .catch(next);
})


module.exports = wikiRouter;
