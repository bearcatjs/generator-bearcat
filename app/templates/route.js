var bearcat = require('bearcat');

module.exports = function(app) {

	app.get('/', bearcat.getRoute('homeController', 'index'));
}