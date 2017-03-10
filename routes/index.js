const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('hello!');
//   res.render( 'index', { tweets: tweets, showForm: true } );
});

module.exports = router;