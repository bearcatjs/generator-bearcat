var bearcat = require('bearcat');

module.exports = function(app) {

	app.get('/', bearcat.getRoute('helloController', 'index'));
}