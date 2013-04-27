define([],
  function () {
  'use strict';

  /**
   * Create a character
   * @name Character
   * @constructor
   */
  var Character = function () {
    this.current = null;
  };

  /**
   * Set the active character
   * @function
   * @name Character#active
   */
  Character.prototype.active = function (id, callback) {
    if (this.all[id]) {
      this.current = this.all[id];
    } else {
      throw new Error('Could not load character by id.');
    }

    if (callback) {
      callback();
    }
  };

  /**
   * Set inventory for player and take inventory from player if character requires
   * it.
   * @name Character#setInventory
   * @function
   * @param {string} inventory Inventory name
   * @param {object} user Current player
   */
  Character.prototype.setInventory = function (inventory, user) {
    if (!!inventory && !user.hasInventory(inventory) && !user.hasCollection(inventory)) {
      user.inventory.push(inventory);
      user.save();
    }
  };

  return Character;
});
