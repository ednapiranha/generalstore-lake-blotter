'use strict';

var fs = require('fs');

var FILE_PATH = 'stories';
var WRITE_PATH = 'generalstore/config';
var KEYWORDS = {
  level: true,
  location: true,
  background_image: true,
  description: true
};

var KEYWORDS_GROUP = {
  character: 'characters',
  item: 'items'
};

var SEC_PROPERTY = /^\w+:\s/gi;

/**
 * Creates the parser.
 * @constructor
 */
var Parser = function () {
  this.resultJSON = {
    level: 0,
    location: false,
    background_image: false,
    description: false,
    characters: {},
    items: {}
  };
  this.secProperties = {};
  this.currLevel = 0;
};

/**
 * Generates the content and writes to a JSON config file.
 * @param {string} data File contents
 * @param {function (err, resultJSON)} callback Returns JSON content for the
 * level.
 */
Parser.prototype.processContent = function (data, callback) {
  var self = this;

  self.resultJSON.characters = {};
  self.resultJSON.items = {};

  var content = data.split(/\n|\r/gi);

  if (!content[content.length - 1].match(/\n|\r/)) {
    content.push('\n');
  }

  for (var i = 0; i < content.length; i ++) {
    var c = content[i].toString().trim();

    try {
      this.setProperty(c);
    } catch (err) {
      callback(err);
    }
  }

  fs.writeFile(this.writePath + '/level' + this.currLevel + '.json',
    JSON.stringify(this.resultJSON, undefined, 4), function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, self.resultJSON);
      self = null;
    }
  });
};

/**
 * Sets the properties for the level.
 * @param {string} c Property name within level.
 */
Parser.prototype.setProperty = function (c) {
  // primary properties
  if (KEYWORDS[c] || KEYWORDS_GROUP[c]) {
    this.currProperty = c;

  // secondary properties
  } else if (c.match(SEC_PROPERTY)) {
    var propArray = c.split(/:\s/);

    if (!isNaN(propArray[1])) {
      propArray[1] = parseInt(propArray[1], 10);

    } else if (propArray[1] === 'false') {
      propArray[1] = '';
    }

    this.secProperties[propArray[0]] = propArray[1];

  // level content
  } else if (c.length > 0) {
    if (this.currProperty === 'level') {
      this.currLevel = parseInt(c, 10);
    }

    if (!isNaN(c)) {
      c = parseInt(c, 10);
    }

    if (c === 'false' && this.currProperty === 'description') {
      c = '';
    }

    this.resultJSON[this.currProperty] = c;

  // line break
  } else {
    if (KEYWORDS_GROUP[this.currProperty]) {
      if (!this.secProperties.name) {
        throw new Error('Invalid secondary property.');
      }

      var propId = this.currLevel + '-' + this.secProperties.name;

      this.resultJSON[KEYWORDS_GROUP[this.currProperty]][propId] = this.secProperties;
    }

    this.secProperties = {};
    this.currProperty = null;
  }
};

/**
 * Reads through and processes a file.
 * @param {string} result Filename for the level.
 * @param {function (err, json)} callback Returns JSON content for the
 * level.
 */
Parser.prototype.processText = function (result, callback) {
  var self = this;

  fs.readFile(self.filePath + '/' + result, 'utf8', function (err, data) {
    if (err) {
      callback(err);

    } else {
      self.processContent(data, callback);
    }
  });
};

/**
 * Reads through the stories directory and generates each as a json file.
 * @param {function (err, result)} callback Returns the complete list of JSON
 * content for all files in the directory.
 */
exports.run = function (options, callback) {
  var result = [];
  var currFilePath = options.filePath || FILE_PATH;
  var currWritePath = options.writePath || WRITE_PATH;

  fs.readdir(currFilePath, function (err, files) {
    if (files.length < 1) {
      return callback(new Error('No files found. Please create a story'));
    }

    if (err) {
      callback(err);

    } else {
      var count = 0;

      files.filter(function (file) {
        return file.substr(-4) === '.txt';

      }).forEach(function (file) {
        count = count + 1;
        var parser = new Parser();
        parser.filePath = currFilePath;
        parser.writePath = currWritePath;

        parser.processText(file, function (err, f) {
          if (err) {
            callback(err);

          } else {
            result.push(f);
            if (result.length === count) {
              callback(null, result);
            }
          }
        });
      });
    }
  });
};
