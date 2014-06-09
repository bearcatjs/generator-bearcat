var logger = require('pomelo-logger').getLogger('<%= _.slugify(appname) %>', 'app');
var Bearcat = require('bearcat');

var contextPath = require.resolve('./context.json');

var bearcat = Bearcat.createApp([contextPath]);

bearcat.start(function() {});

// Uncaught exception handler
process.on('uncaughtException', function(e) {
	logger.error('Caught exception: ' + e.stack);
});