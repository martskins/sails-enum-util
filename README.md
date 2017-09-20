# INSTALLATION
```
npm install --save sails-enum-util
```

# A WORD OF CAUTION

This util uses `sails-memory` db adapter, which is not suitable for production. Use at your own risk.

# USAGE

The SailsEnum constructor takes two parameters:

**attributes**: An object representing the attributes of the model, as defined by any sails model. An attribute with the `primaryKey` setting set to `true` is required.

**data**: Array of elements to be created on sails lift (OPTIONAL)

The model's update, create, destroy, alter and drop methods are not allowed for models created with this util. Since they should be treated as static. If you try to use any of those it will throw an error.

### EXAMPLE
```js
/* api/models/Gender.js */

const Enum = require('sails-enum-util');

module.exports = new Enum({
	attributes: {
		code: {
			type: 'string',
			primaryKey: true
		},
		description: 'string'
	},
	data: [{
	   code: 'MALE',
	   description: 'Some description about the male gender'
	}, {
		code: 'FEMALE',
		description: 'Some description about the female gender'
	}, {
		....
	}]
})
```
