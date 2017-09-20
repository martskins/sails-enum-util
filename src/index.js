class SailsEnum {
  constructor({data = [], attributes = {}}) {
    const self = this;

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

    function rejectOperation () {
      var error = new Error('ERROR: Operation not permitted on Enum type object');
      var callback;
      if (typeof arguments[arguments.length - 1] === 'function') {
        callback = arguments[arguments.length - 1]
      }

      if (callback) {
        return callback(error, null);
      } else {
        return Promise.reject(error);
      }
    }

    sails.on('lifted', function () {
      let Model = sails.models[self.identity];
      data.forEach(x => Model.create(x, function (err, created) {
        if (err) {
          throw err;
        }
      }));

      // Reject operations that want to change instances of an Enum
      Model.update = rejectOperation;
      Model.create = rejectOperation;
      Model.destroy = rejectOperation;
      Model.alter = rejectOperation;
      Model.drop = rejectOperation;
    });
  }
}

module.exports = SailsEnum;
