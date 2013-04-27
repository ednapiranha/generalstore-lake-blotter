define(['../media/js/base/character', '../media/js/base/user'],
  function (Character, User) {
  'use strict';

  var options = {
    env: 'test'
  };

  var user = new User(options);
  var character = new Character();

  describe('Character', function () {
    afterEach(function () {
      user.reset();
    });

    it('should set user inventory', function (done) {
      character.setInventory('cloud', user);
      expect(user.hasInventory('cloud')).to.equal(true);
      done();
    });
  });
});
