requirejs.config({
  deps: ['main'],
  paths: {
    'jquery': 'lib/jquery',
    'nunjucks': 'lib/nunjucks'
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'nunjucks': {
      exports: 'nunjucks'
    }
  }
});
