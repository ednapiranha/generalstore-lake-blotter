define([],
  function () {
  'use strict';

  /**
   * Create an item.
   * @name Item
   * @constructor
   */
  var Item = function () {
    this.current = null;
  };

  /**
   * Set the active item
   * @name Item#active
   * @function
   * @param {string} id Unique id of the item
   */
  Item.prototype.active = function (id, callback) {
    if (this.all[id]) {
      this.current = this.all[id];
    } else {
      throw new Error('Could not load item by id.');
    }

    if (callback) {
      callback();
    }
  };

  /**
   * Set inventory for player and take inventory from player if item requires
   * it.
   * @name Item#setInventory
   * @function
   * @param {string} inventory Inventory name
   * @param {object} user Current player
   */
  Item.prototype.setInventory = function (inventory, user) {
    if (!!inventory && !user.hasInventory(inventory) && !user.hasCollection(inventory)) {
      user.inventory.push(inventory);
      user.save();
    }
  };

  /**
   * Set the user's new level if it is higher than their current level
   * @name Item#setLevel
   * @function
   * @param {number} level Item level
   * @param {object} user Current player
   * @returns {boolean}
   */
  Item.prototype.setLevel = function (level, user) {
    if (level && user.level < level) {
      user.level = level;
      user.save();
      user.giveRequirement(level, this);
      return true;
    }
    return false;
  };

  return Item;
});
