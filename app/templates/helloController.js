var HelloController = function() {

}

HelloController.prototype.index = function(req, res, next) {
	res.send('hello world bearcat');
}

module.exports = {
	id: "helloController",
	func: HelloController
}