define(['jquery', 'nunjucks', 'templates'],
  function ($, nunjucks) {
  'use strict';

  var body = $('body');
  var notification = $('#notification');

  var self = {
    loadTemplate: function (template, data, opts) {
      var wrapper ='#wrapper';
      if (opts) {
        wrapper = opts.wrapper;
      }
      body.find(wrapper).html(
        nunjucks.env.getTemplate(template).render({ data: data.data || data })
      );
    },

    showNotification: function (msg) {
      notification.text(msg).removeClass('hidden');
      setTimeout(function () {
        notification.text(msg).addClass('hidden');
      }, 1000);
    }
  };

  return self;
});
