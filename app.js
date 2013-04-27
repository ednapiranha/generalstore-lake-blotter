var express = require('express');
var configurations = module.exports;
var app = express();
var server = require('http').createServer(app);
var nconf = require('nconf');
var settings = require('./settings')(app, configurations, express);
var nunjucks = require('nunjucks');
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
var parser = require('./lib/parser');

env.express(app);
nconf.argv().env().file({ file: 'local.json' });

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/generate', function (req, res) {
  parser.run({}, function (err, stories) {
    if (err) {
      throw new Error(err);
    } else {
      res.render('script.html', { stories: stories });
    }
  });
});

var domain = nconf.get('domain');
var port = process.env.PORT | nconf.get('port');
console.log('Listening on ' + domain + ':' + port);
console.log('To regenerate, go to: ' + domain + ':' + port + '/generate');
console.log('ctrl-c to quit.')
app.listen(port);
