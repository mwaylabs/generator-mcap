'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var uuid = require('node-uuid');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.uuid = uuid.v4();

    this.argument('name', { type: String, required: false });
    this.name = this.name || path.basename(process.cwd());
    this.name = this._.camelize(this._.slugify(this._.humanize(this.name)));
    this.baseAlias = '/' + this.name;
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      name: 'name',
      message: 'Project name',
      default: this.name
    },{
      name: 'baseAlias',
      message: 'Base alias',
      default: function(props) {
        return this._.camelize(this._.slugify(this._.humanize(props.name)));
      }.bind(this),
      validate: function(value) {
        return value.match(/^[/\w0-9-_]+$/) !== null;
      }
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.baseAlias = '/' + props.baseAlias;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('server');
      this.dest.mkdir('client');

      this.template('_mcap.json', 'mcap.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('gitattributes', '.gitattributes');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('jshintrc', '.jshintrc');
    }
  }
});
