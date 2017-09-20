'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SailsEnum = function SailsEnum(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data,
      _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === undefined ? {} : _ref$attributes;

  _classCallCheck(this, SailsEnum);

  var self = this;

  if (sails && !sails.config.connections.enums) {
    sails.config.connections.enums = {
      adapter: 'sails-memory'
    };
  }

  this.connection = 'enums';
  this.autoPk = false;
  this.autoCreatedAt = false;
  this.autoUpdatedAt = false;
  this.attributes = attributes;

  function rejectOperation() {
    var error = new Error('ERROR: Operation not permitted on Enum type object');
    var callback;
    if (typeof arguments[arguments.length - 1] === 'function') {
      callback = arguments[arguments.length - 1];
    }

    if (callback) {
      return callback(error, null);
    } else {
      return Promise.reject(error);
    }
  }

  sails.on('lifted', function () {
    var Model = sails.models[self.identity];
    data.forEach(function (x) {
      return Modelcreate(x, function (err, created) {
        if (err) {
          throw err;
        }
      });
    });

    // Reject operations that want to change instances of an Enum
    Model.update = rejectOperation;
    Model.create = rejectOperation;
    Model.destroy = rejectOperation;
    Model.alter = rejectOperation;
    Model.drop = rejectOperation;
  });
};

module.exports = SailsEnum;