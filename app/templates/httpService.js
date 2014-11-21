var logger = require('pomelo-logger').getLogger('nscheduler', 'HttpService');
var routes = require('../route');
var express = require('express');
// var RedisStore = require('connect-redis')(express);
var bearcat = require('bearcat');
var http = require('http');

var HttpService = function() {
	this.$id = "httpService";
	this.$init = "init";
	this.$configService = null;
	this.app = null;
}

HttpService.prototype.init = function() {
	var self = this;
	var rootdir = process.cwd();
	var app = express();

	var port = this.$configService.getHttpPort();
	var cookieSecret = this.$configService.getCookieSecret();
	var sessionKey = this.$configService.getSessionKey();
	// var redisSessionHost = this.$configService.getRedisSessionHost();
	// var redisSessionPort = this.$configService.getRedisSessionPort();
	var env = this.$configService.getEnv();

	app.configure(function() {
		app.set('env', env);
		app.set('view engine', 'html');
		app.engine('.html', require('ejs').__express);
		app.set('view options', {
			layout: false
		});
		app.use(express.bodyParser({
			uploadDir: rootdir + '/public/images/'
		}));
		if (process.env.EXPRESS_LOGGER) {
			app.use(express.logger());
		}
		app.use(express.query());
		app.use(express.cookieParser(cookieSecret));
		app.use(express.session({
			secret: cookieSecret,
			key: sessionKey,
			// store: new RedisStore({
			// 	host: redisSessionHost,
			// 	port: redisSessionPort
			// })
		}));
		app.use(express.methodOverride());
		app.use(express.timeout(60 * 1000));
		app.use(express['static'](rootdir + '/public'));
		app.use(bearcat.getRoute('signFilter', 'authSign'));
		app.use(app.router);
		app.use(bearcat.getRoute('errorPageController', 'page404'));
		app.use(bearcat.getRoute('errorPageController', 'page500'));
		app.set('port', port);
		app.enable('trust proxy');
	});

	this.app = app;

	routes(app);

	http.createServer(app).listen(app.get('port'), function() {
		logger.info("http server started on pid: %s with port : %s", process.pid, app.get('port'));
	});
}

module.exports = HttpService;