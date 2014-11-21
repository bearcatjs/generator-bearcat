var logger = require('pomelo-logger').getLogger('nscheduler', 'SignFilter');

var SignFilter = function() {
	this.$id = "signFilter";
	this.$cookieService = null;
}

SignFilter.prototype.authSign = function(req, res, next) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);

	var path = req.path;
	if (this.allowPath(path, next)) {
		return;
	}

	var signedCookies = req.signedCookies;
	var user = this.$cookieService.getCookieUser(signedCookies);

	next();
	/*
	if(user) {
		req.session.user = user;
		res.locals.user = user;
		return next();
	} else {
		// redirect to login route url
		res.redirect('/login');
	}
	*/
}

SignFilter.prototype.allowPath = function(path, next) {
	if (path === '/favicon.ico' || path === '/logout' || path === '/login') {
		next();
		return true;
	}

	return false;
}

module.exports = SignFilter;