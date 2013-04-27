require(['require', 'lib/chai', 'lib/mocha'], function (require, chai) {
  assert = chai.assert;
  should = chai.should();
  expect = chai.expect;

  mocha.setup('bdd');

  require(
    ['test.user', 'test.item', 'test.character'],
    function (user, item, character) {
    mocha.run();
  });
});
