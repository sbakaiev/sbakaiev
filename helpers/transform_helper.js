const Helper = require('@codeceptjs/helper');

class Transform extends Helper {

  parsePrice(string = "0") {
    return parseFloat(string.replaceAll(/[^0-9\.]/g, ""));
  }
}

module.exports = Transform;
