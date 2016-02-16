"use strict";

var assert = require('assert');

describe('Regex', function() {
    describe('match', function () {
        it('should match [[blocks]]', function () {

            let input = "[[label]]";
            let output = input.replace(/\[\[(.*)\]\]/gim, 'goto: $1');
            console.log('output:', output)
            assert.equal('goto: label', output);

        });

        it('should match multiline [[blocks]]', function () {

            let input = `
+ start here
[[label]]`;


            let output = input.replace(/\[\[(.*)\]\]/gim, 'goto: $1');
            console.log('output:', output)
            assert.equal('\n+ start here\ngoto: label', output);

        });


        it('should match code [[blocks]]', function () {

            let input = `
            Time to get to work!

            + prompt
            - [[mainmenu]]`;

            let expected = `
            Time to get to work!

            + prompt
            - goto: mainmenu`;

            let output = input.replace(/\[\[(.*)\]\]/gim, 'goto: $1');
            console.log('output:', output);

            assert.equal(expected, output);

        });

    });
});
