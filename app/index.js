'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var BearcatGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');

    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function() {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Bearcat generator.\nUsing this generator you can create bearcat app, bearcat web app or bearcat library.'));

    var prompts = [{
      type: 'list',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'app',
        value: 'bearcat-app'
      }, {
        name: 'web-app',
        value: 'bearcat-webapp'
      }, {
        name: 'library',
        value: 'bearcat-lib'
      }]
    }];

    doStar();

    this.prompt(prompts, function(props) {
      var features = props.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }

      this.doApp = hasFeature('bearcat-app');
      this.doWebApp = hasFeature('bearcat-webapp');
      this.doLib = hasFeature('bearcat-lib');

      done();
    }.bind(this));
  },

  app: function() {
    if (this.doApp || this.doWebApp) {
      this.mkdir('app');
      this.mkdir('coverage');
      this.mkdir('bin');
      this.mkdir('config');
      this.mkdir('config/dev');
      this.mkdir('logs');
      this.mkdir('resource');
      this.template('_bearcat.app.js', 'app.js');
      this.template('_log4js.json', 'config/dev/log4js.json');
    }

    if (this.doWebApp) {
      this.mkdir('app/controller');
      this.mkdir('app/filter');
      this.mkdir('app/dao');
      this.mkdir('app/domain');
      this.mkdir('app/service');
      this.mkdir('app/util');
      this.mkdir('public');
      this.mkdir('public/css');
      this.mkdir('public/js');
      this.mkdir('public/images');
      this.mkdir('views');
      this.copy('index.html', 'views/index.html');
      this.copy('blanket.js', 'coverage/blanket.js');
      this.copy('route.js', 'app/route.js');
      this.copy('server.json', 'config/server.json');
      this.copy('url.json', 'config/dev/url.json');
      this.copy('utils.js', 'app/util/utils.js');
      this.copy('consts.js', 'app/util/consts.js');
      this.copy('fileUtil.js', 'app/util/fileUtil.js');
      this.copy('dataPack.js', 'app/util/dataPack.js');
      this.copy('signFilter.js', 'app/filter/signFilter.js');
      this.template('httpService.js', 'app/service/httpService.js');
      this.copy('configService.js', 'app/service/configService.js');
      this.copy('cookieService.js', 'app/service/cookieService.js');
      this.copy('homeController.js', 'app/controller/homeController.js');
      this.copy('helloController.js', 'app/controller/helloController.js');
      this.copy('errorPageController.js', 'app/controller/errorPageController.js');
    }

    if (this.doLib) {
      this.mkdir('lib');
      this.copy('index.js', 'index.js');
    }

    this.mkdir('test');
    this.template('_context.json', 'context.json');
    this.template('_test-context.json', 'test-context.json');
    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');
    this.copy('gruntfile.js', 'gruntfile.js');
  },

  git: function() {
    this.copy('gitignore', '.gitignore');
  },

  npm: function() {
    this.copy('npmignore', '.npmignore');
  },

  projectfiles: function() {
    this.copy('jshintrc', '.jshintrc');
  }
});

function doStar() {
  var spawn = require('child_process').spawn;
  var n = spawn('npm', ['star', 'bearcat']);

  n.stdout.on('data', function(data) {
    // console.log('stdout: ' + data);
  });

  n.stderr.on('data', function(data) {
    // console.log('stderr: ' + data);
  });
}

module.exports = BearcatGenerator;