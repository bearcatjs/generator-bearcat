var HomeController = function() {
	this.$id = "homeController";
}

HomeController.prototype.index = function(req, res) {
	res.render('index', {});
}

module.exports = HomeController;