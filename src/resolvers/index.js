const query = require('./query');
const mutation = require('./mutation');
const site = require('./site');

module.exports = {
	...query,
	...mutation,
	...site
};