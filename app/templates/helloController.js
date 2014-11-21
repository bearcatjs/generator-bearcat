var HelloController = function() {
	this.$id = "helloController";
}

HelloController.prototype.index = function(req, res) {
	res.send('hello world bearcat');
}

module.exports = HelloController;