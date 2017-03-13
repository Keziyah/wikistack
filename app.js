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


models.User.sync({})
    .then(function() {
        return models.Page.sync({})
    })
    .then(function() {
        app.listen(3000, function() {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error);
