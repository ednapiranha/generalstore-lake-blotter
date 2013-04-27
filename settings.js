// Module dependencies.
module.exports = function(app, configurations, express) {
  var nconf = require('nconf');

  nconf.argv().env().file({ file: 'local.json' });

  // Configuration
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/generalstore'));
    app.use(function(req, res, next) {
      res.locals.debug = nconf.get('debug');
      next();
    });
    app.locals.pretty = true;
    app.use(app.router);
  });

  // Express is not supposed to be run outside of development for this app
  // so we can apply this here as is.
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

  return app;
};
