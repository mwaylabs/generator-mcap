/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('mcap-project creation', function () {

  describe('with prompts', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.resolve(__dirname, './temp'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          name: 'My mCAP Project'
        })
        .on('end', done);
    });

    it('creates files', function () {

      var expectedFiles = [
        'mcap.json',
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.jshintrc',
        'client',
        'server'
      ];

      var expectedContent = [
        ['mcap.json', /"name": "My mCAP Project"/],
        ['mcap.json', /"baseAlias": "\/myMCapProject"/],
        ['mcap.json', /uuid": "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/]
      ];

      assert.file(expectedFiles);
      assert.fileContent(expectedContent);
    });
  });

  describe('with options', function () {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.resolve(__dirname, './temp'))
        .withOptions({ 'skip-install': true, name: 'MymCAPProjectApp' })
        .on('end', done);
    });

    it('creates files', function () {

      var expectedFiles = [
        'mcap.json'
      ];

      var expectedContent = [
        ['mcap.json', /"name": "MymCAPProjectApp"/],
        ['mcap.json', /"baseAlias": "\/mymCapprojectApp"/]
      ];

      assert.file(expectedFiles);
      assert.fileContent(expectedContent);
    });
  });
});
