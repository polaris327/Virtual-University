var should = require('should');
var assert = require('assert');
var request = require('supertest');
var http = require('http');

process.env.NODE_ENV = 'test';

var app = require('../server');

// use zombie.js as headless browser
var Browser = require('zombie');


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 27; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
var qarrays = [];
var strings;


var i = 0;
qarrays[0] = makeid();
while (i < 2) {


    describe('MULTIPLE CHOICE', function() {

        strings = [
            '{"question":"' + qarrays[0] + '", "answers":["Trump", "Obama", "Bush"], "correct":"Trump", "type":"mc"}'
        ];

        this.timeout(15000);
        // load the contact page
        before(function(done) {

            // initialize the browser using the same port as the test application
            this.browser = new Browser({
                site: 'http://localhost:3000'
            });

            //Load up the admin page.
            this.browser.visit('/admin', done);
        });




        //Should check if the admin page loaded.
        it('SHOULD LOAD ADMIN PAGE CORRECTLY', function() {
            assert.ok(this.browser.success);
        });

        it('SHOULD SUBMIT JSON STRING', function(done) {

            var browser = this.browser;
            browser.fill('.code', strings[0]);

            browser.pressButton('#submit').then(function() {
                assert.ok(browser.success);
            }).then(done, done);
        });

        it('SHOULD VALIDATE RETURNED HTML', function(done) {
            var browser = this.browser;

            browser.pressButton('#rerender').then(function() {
                assert.ok(browser.success);
                assert.equal(browser.text('.question_Text'), qarrays[0]);

            }).then(done, done);

        });

    });

    i++;
}
qarrays[0] = makeid();
describe('MULTIPLE SELECT', function() {

    strings = [
        '{"question":"' + qarrays[0] + '", "answers":["Trump", "Obama", "Bush"], "correct":"Trump", "type":"ms"}'
    ];

    this.timeout(15000);
    // load the contact page
    before(function(done) {

        // initialize the browser using the same port as the test application
        this.browser = new Browser({
            site: 'http://localhost:3000'
        });

        //Load up the admin page.
        this.browser.visit('/admin', done);
    });




    //Should check if the admin page loaded.
    it('should show the admin page', function() {
        assert.ok(this.browser.success);
    });

    it('should submit json', function(done) {

        var browser = this.browser;
        browser.fill('.code', strings[0]);

        browser.pressButton('#submit').then(function() {
            assert.ok(browser.success);
        }).then(done, done);
    });

    it('should validate the HTML', function(done) {
        var browser = this.browser;

        browser.pressButton('#rerender').then(function() {
            assert.ok(browser.success);
            assert.equal(browser.text('.question_Text'), qarrays[0]);




        }).then(done, done);
    });

});





describe('TESTING GRID', function() {

    qstrings = [
        '{"type":"grid"}'
    ];

    this.timeout(15000);
    // load the contact page
    before(function(done) {

        // initialize the browser using the same port as the test application
        this.browser = new Browser({
            site: 'http://localhost:3000'
        });

        //Load up the admin page.
        this.browser.visit('/admin', done);
    });




    //Should check if the admin page loaded.
    it('should show the admin page fully loaded', function() {
        assert.ok(this.browser.success);
        //expect(browser.location.toString()).toBe("http://localhost:3000/admin");
    });

    it('SHOULD JSON GRID', function(done) {

        var browser = this.browser;
        browser.fill('.code', qstrings[0]);

        browser.pressButton('#submit').then(function() {
            assert.ok(browser.success);
        }).then(done, done);
    });

    it('should validate the Grid Module HTML', function(done) {
        var browser = this.browser;

        browser.pressButton('#rerender').then(function() {
            assert.ok(browser.success);
            browser.assert.attribute('button', 'disabled', null);
            browser.assert.attribute('textarea');
            browser.assert.attribute('input');
            browser.assert.attribute('tr');
            browser.assert.attribute('td');

        }).then(done, done);

    });

});








// //Should check if the admin page loaded.
// it('should show the admin page', function() {
// 	assert.ok(this.browser.success);
// });

// it('should submit json', function(done) {

// 	var browser = this.browser;

// 	browser.fill('.code', '{"question":"Favorite Color?", "answers":["Red", "Green", "Blue"], "correct":"Red", "type":"ms"}');

// 	browser.pressButton('#submit').then(function() {
// 		assert.ok(browser.success);
// 	}).then(done, done);

// 	browser.fill('.code', '');
// });

// it('should validate the HTML', function(done) {
// 	var browser = this.browser;

// 	browser.pressButton('#render').then(function() {
// 		assert.ok(browser.success);

// 		assert.equal(browser.text('.question_Text'), "Favorite Color?");
// 	}).then(done, done);
// });

// //Should check if the admin page loaded.
// it('should show the admin page', function() {
// 	assert.ok(this.browser.success);
// });

// it('should submit json', function(done) {

// 	var browser = this.browser;

// 	browser.fill('.code', '{"type":"grid"}');

// 	browser.pressButton('#submit').then(function() {
// 		assert.ok(browser.success);
// 	}).then(done, done);

// 	browser.fill('.code', '');
// });

// it('should validate the HTML', function(done) {
// 	var browser = this.browser;

// 	browser.pressButton('#render').then(function() {
// 		assert.ok(browser.success);

// 		//assert.ok(browser.text('#grid'));
// 	}).then(done, done);
// });

//}
