/*global describe, beforeEach, it*/
'use strict';

var assert = require('yeoman-generator').assert;
var helper = require('./helper');

describe('mcap:model', function () {
  beforeEach(function (done) {

    var answers = {
      name: 'MyApp'
    };

    // Creates a generateor with the default options / arguments
    helper.createAppGenerator({
      answers: answers
    }, done);
  });

  it('creates expected files', function (done) {
    var expectedFiles = [
      'models/contact.json'
    ];
    var expectedContent = {
      name: 'Contact',
      label: 'Contact',
      firstname: {
        type: 'string',
        mandatory: false,
        key: false
      }
    };

    var answers = {
      modelName: 'Contact',
      modelLabel: 'Contact',
      name: 'firstname',
      type: 'string',
      mandatory: false,
      key: false,
      addOneMore: false
    };

    helper.createSubGenerator('model', {answers: answers}, function() {
      assert.file(expectedFiles);
      helper.deepEqual('models/contact.json', expectedContent);
      done();
    });
  });

});
