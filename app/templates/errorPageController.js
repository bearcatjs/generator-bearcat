var ErrorPageController = function() {
	this.$id = "errorPageController";
}

ErrorPageController.prototype.page404 = function(req, res) {
	res.send('error 404');	
}

ErrorPageController.prototype.page500 = function(req, res) {
	res.send('error 404');	
}

module.exports = ErrorPageController;