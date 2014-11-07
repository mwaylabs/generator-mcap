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

    var gen = helper.createSubGenerator('model', {answers: answers}, function() {
      assert.file(expectedFiles);
      console.log(gen.generator.prepareValues());
      helper.deepEqual('models/contact.json', expectedContent);
      done();
    });
  });

  describe.only('.prepareValues()', function (done) {

    beforeEach(function(done) {
      var answers = {
        modelName: 'Contact',
        modelLabel: 'Contact',
        name: 'firstname',
        type: 'string',
        mandatory: false,
        key: false,
        addOneMore: false
      };

      this.gen = helper.createSubGenerator('model', {answers: answers}, done);
    });

    it('is implemented', function () {
      assert.equal( typeof this.gen.generator.prepareValues, 'function');
    });

    it('@return', function () {
      assert.deepEqual(this.gen.generator.prepareValues(), {
        name: 'Contact',
        attr: [{
          modelName: 'Contact',
          modelLabel: 'Contact',
          name: 'firstname',
          type: 'string',
          mandatory: false,
          key: false
        }]
      });
    });
  });
});
