define([],
  function () {
  'use strict';

  var player;
  var keyName = 'player';

  var defaults = {
    level: 1,
    items: [],
    inventory: [],
    collection: [],
    interacted: []
  };

  /**
   * Load the user's settings from localStorage
   */
  var loadUser = function (self) {
    return JSON.parse(localStorage.getItem(self.keyName));
  };

  /**
   * Create a player. If the player already has a valid settings file,
   * then that will be used. If the file does not exist or is invalid, their
   * settings are reset to the defaults.
   * @name User
   * @constructor
   */
  var User = function (options) {
    if (options.env) {
      this.keyName = keyName + '_' + options.env;
    }

    if (!localStorage.getItem(this.keyName)) {
      localStorage.setItem(this.keyName, JSON.stringify(defaults));
      player = loadUser(this);

    } else {
      try {
        player = loadUser(this);

      } catch (err) {
        console.error('Error loading configuration file! Resetting to defaults');
        localStorage.setItem(this.keyName, JSON.stringify(defaults));
        player = loadUser(this);
      }
    }

    this.level = player.level;
    this.items = player.items;
    this.inventory = player.inventory;
    this.collection = player.collection;
    this.interacted = player.interacted;
  };

  /**
   * Checks the player's current inventory list
   * @name User#hasInventory
   * @function
   * @param {string} inventory Inventory name
   * @returns {boolean}
   */
  User.prototype.hasInventory = function (inventory) {
    return this.inventory.indexOf(inventory) > -1;
  };

  /**
   * Checks the player's inventory history for the entire gameplay.
   * @name User#hasCollection
   * @function
   * @param {string} inventory Inventory name
   * @returns {boolean}
   */
  User.prototype.hasCollection = function (inventory) {
    return this.collection.indexOf(inventory) > -1;
  };

  /**
   * Checks the player's interaction history for the entire gameplay.
   * @name User#hasInteracted
   * @function
   * @param {object} character Character object
   * @returns {boolean}
   */
  User.prototype.hasInteracted = function (level, character) {
    return this.interacted.indexOf(level + '-' + character.current.name) > -1;
  };

   /**
   * Give inventory to character or item
   * @name User#giveRequirement
   * @function
   * @param {object} obj Current character or item
   */
  User.prototype.giveRequirement = function (level, obj) {
    var requirement = obj.current.requires;
    var objName = obj.current.name;

    if (!this.hasInteracted(level, obj)) {
      this.interacted.push(level + '-' + objName);
    }

    if (this.hasInventory(requirement)) {
      this.collection.push(requirement);
      this.inventory.splice(this.inventory.indexOf(requirement), 1);
    }
    this.save();
  };

  /**
   * Saves user's current game stats.
   * @name User#save
   * @function
   */
  User.prototype.save = function () {
    localStorage.setItem(this.keyName, JSON.stringify(this));
  };

  /**
   * Reset user's game stats.
   * @name User#reset
   * @function
   */
  User.prototype.reset = function () {
    localStorage.removeItem(this.keyName);
    this.level = defaults.level;
    this.items = defaults.items;
    this.inventory = defaults.inventory;
    this.collection = defaults.collection;
    this.interacted = defaults.interacted;
  };

  return User;
});
