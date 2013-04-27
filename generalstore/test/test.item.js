define(['../media/js/base/item', '../media/js/base/user'],
  function (Item, User) {
  'use strict';

  var options = {
    env: 'test'
  };

  var user = new User(options);
  var item = new Item();

  describe('Item', function () {
    afterEach(function () {
      user.reset();
    });

    it('should set user level', function (done) {
      expect(user.level).to.equal(1);
      item.setLevel(2, user);
      expect(user.level).to.equal(2);
      done();
    });
  });
});
