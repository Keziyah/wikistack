const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const models = require('./models');
const wikiRouter = require('./routes/wiki');

nunjucks.configure('views', {
    noCache: true
});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('combined'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes);

app.use('/wiki', wikiRouter);

app.get("/", function(req, res) {
    Page.findAll({
            where: {
                status: 'open'
            }
        })

        .then(function(foundPages) {
            // console.log("FOUNDPAGES!!!!!", foundPages)
            res.render("index", {
                pages: foundPages
            })
        })
        .catch(function(err) {
            console.error(err)
        })
})

models.User.sync({
        //force: true
    })
    .then(function() {
        return models.Page.sync({
            //force: true
        })
    })
    .then(function() {
        app.listen(3000, function() {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error);
