var logger = require('pomelo-logger').getLogger('<%= _.slugify(appname) %>', 'app');
var serverConfig = require('./config/server');
var express = require('express');
var http = require('http');
var app = express();
var Route = require('./app/route');

var rootdir = process.cwd();

app.configure(function() {
	app.set('view engine', 'html');
	app.engine('.html', require('ejs').__express);
	app.set('view options', {
		layout: false
	});
	app.use(express.bodyParser({
		uploadDir: rootdir + '/public/images/'
	}));
	app.use(express.query());
	app.use(express.cookieParser(serverConfig["cookie_secret"]));
	app.use(express.session({
		secret: serverConfig["cookie_secret"],
		key: serverConfig["key"]
	}));
	app.use(express.methodOverride());
	app.use(express.timeout(100 * 1000));
	app.use(express['static'](__dirname + '/public'));
	// app.use(express.favicon(__dirname + '/public/favicon.ico'), {
	//   maxAge: 2592000000
	// });
	app.use(app.router);
	app.set('host', serverConfig["host"]);
	app.set('port', serverConfig["port"]);
	app.enable('trust proxy');
});

var Bearcat = require('bearcat');

var contextPath = require.resolve('./context.json');

var bearcat = Bearcat.createApp([contextPath]);

bearcat.start(function() {
	Route(app);
	http.createServer(app).listen(app.get('port'), app.get('host'), function() {
		logger.info("server started on " + app.get('host') + ":" + app.get('port') + " on " + app.get('env') + " mode");
	});
});

// Uncaught exception handler
process.on('uncaughtException', function(e) {
  logger.error('Caught exception: ' + e.stack);
});