var CookieService = function() {
	this.$id = "cookieService";
	this.$configService = null;
}

CookieService.prototype.setCookie = function(res, val, opt) {
	var cookieKey = this.$configService.getCookieKey();
	var domain = this.$configService.getHttpHost();

	var options = {
		domain: domain,
		path: '/',
		signed: true
	};
	opt = opt || options;

	if (typeof val === 'object') {
		val = JSON.stringify(val);
	}

	res.cookie(cookieKey, val, opt);
}

CookieService.prototype.getCookieUser = function(cookies) {
	var cookieKey = this.$configService.getCookieKey();

	if (cookies && typeof cookies === 'object') {
		var user = cookies[cookieKey];
		if (user) {
			user = JSON.parse(user);
		}
		return user;
	} else {
		return null;
	}
}

CookieService.prototype.clearCookie = function(req, res) {
	var cookieKey = this.$configService.getCookieKey();
	var domain = this.$configService.getHttpHost();

	req.session.destroy(function() {});
	res.clearCookie(cookieKey, {
		domain: domain,
		path: '/',
	});
}

module.exports = CookieService;