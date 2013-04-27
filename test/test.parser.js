'use strict';

var should = require('should');

var parser = require('../lib/parser');

describe('Parser', function () {
  it('generates a valid parsed file', function (done) {
    var options = {
      filePath: 'test/valid_files',
      writePath: 'test/valid_files/config'
    };
    parser.run(options, function (err, stories) {
      if (err) {
        throw new Error(err);
      } else {
        stories.length.should.equal(1);
        stories[0].level.should.equal(1);
        stories[0].location.should.equal('Some Dark Alley Valid');
        stories[0].background_image.should.equal('alley.jpg');
        stories[0].description.should.equal('Welcome to the land of fluffy clouds and happiness.');
        should.exist(stories[0].characters['1-bear']);
        should.exist(stories[0].characters['1-dog']);
        should.exist(stories[0].items['1-car']);
      }
      done();
    });
  });

  it('generates an invalid parsed file', function (done) {
    var options = {
      filePath: 'test/invalid_files',
      writePath: 'test/invalid_files/config'
    };
    var count = 0;

    parser.run(options, function (err, stories) {
      should.exist(err);
      should.not.exist(stories);
      err.toString().should.equal('Error: Invalid secondary property.');
      if (++count === 1) {
        done();
      }
    });
  });
});
