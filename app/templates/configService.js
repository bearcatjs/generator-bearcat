var bearcat = require('bearcat');
var rootdir = process.cwd();

var ConfigService = function() {
	this.$id = "configService";
	this.$init = "init";
	this.serverConfig = null;
	this.$VhttpUrl = "${http.url}";
	this.$VhttpHost = "${http.host}";
	this.$VhttpPort = "${http.port}";
	this.$VredisSessionHost = "${redis.host}";
	this.$VredisSessionPort = "${redis.port}";
}

ConfigService.prototype.init = function() {
	this.loadServerConfig();
}

ConfigService.prototype.loadServerConfig = function() {
	var loadPath = rootdir + '/config/' + 'server.json';
	var serverConfig = require(loadPath);

	this.serverConfig = serverConfig;
}

ConfigService.prototype.getCookieKey = function() {
	return this.serverConfig['cookie_key'];
}

ConfigService.prototype.getCookieSecret = function() {
	return this.serverConfig['cookie_secret'];
}

ConfigService.prototype.getSessionKey = function() {
	return this.serverConfig['session_key'];
}

ConfigService.prototype.getHttpUrl = function() {
	return this.$VhttpUrl;
}

ConfigService.prototype.getHttpHost = function() {
	return this.$VhttpHost;
}

ConfigService.prototype.getHttpPort = function() {
	return this.$VhttpPort;
}

ConfigService.prototype.getRedisSessionHost = function() {
	return this.$VredisSessionHost;
}

ConfigService.prototype.getRedisSessionPort = function() {
	return this.$VredisSessionPort;
}

ConfigService.prototype.getEnv = function() {
	return bearcat.getApplicationContext().getEnv();
}

module.exports = ConfigService;