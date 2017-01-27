var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('API', function() {

	//Our local server instance
	var url = 'http://localhost:3000';

	//Will hold ids created by POST
	var ids = [];
	var pids = [];
	var aids = [];

	//Whoever takes a look at this we can add incomplete data and different types of data in to simulate different cases.
	var mods = [{
		data: '{"name":"multiple-choice","type":"radio","question":"Hello yall","answers":["asdf","dasf"]}'
	}, {
		data: '{"name":"multiple-select","type":"checkbox","question":"Hello yall","answers":["Quang","dasf"]}'
	}, {
		data: '{"name":"true-false","type":"radio","question":"Hello yall","answers":[]}'
	}, {
		data: '{"name":"video","type":"video","question":"","answers":[]}'
	}, {
		data: '{"name":"text-submit","type":"textbox","question":"","answers":[]}'
	}];

	//var somestring = '"radio",:"HELLLLLLLLLLLLLLLLLLLLLLO",:["asdf","dasf"],:"bahaha"'randomString(5,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')



	function getmodule() {
		var a;

		var modules = [{
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			}, {
				type: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				question: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				answers: [randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')],
				correct: randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			},

		];

		return modules;
	}



	var testm =
		[

			'{"type":"ONE-choice","type":"radio","question":"Hello yall","answers":["asdf","dasf"]}',
			'{"type":"TWO-choice","type":"radio","question":"Hello yall","answers":["asdf","dasf"]}',
			'{"type":"THREE-choice","type":"radio","question":"Hello yall","answers":["asdf","dasf"]}'


		];


	var module_arr = [];

	function randomString(length, chars) {
		var result = '';
		for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
	}

	function randomStringblock() {

		return '{"type":' + '"' + randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + '"' + ',' + ' "question":' + '"' + randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + '"' + ',' + ' "answer":' + '"' + randomString(3, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + '"' + ',' + ' "correct":' + '"' + randomString(4, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + '"}';
	}

	function makemodule() {
		var random_modules = [];

		for (i = 0; i < 10; i++) {
			random_modules[i] = randomStringblock();
		}

		return random_modules;

	}



	for (i = 0; i < mods.length; i++) {
		module_arr[i] = mods[i];

	}



	//Then returns the original string if successful which is then validated.
	describe('POST Data', function() {

		//Loops through sample modules and POSTs them.
		a = getmodule();
		it('Should return a panel based on the input', function(done) {
			//Set body to sample mod
			var body = {
				panel: a
			}

			//Send to POST route for modules.
			request(url)
				.post('/api/POST/panel')
				.send(body)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {

					if (err)
						throw err;


					//checking respond to see if it has property
					res.body.panel.should.have.property('_id');
					res.body.panel.should.have.property('modules');

					var z = res.body.panel.modules.length;


					for (i = 0; i < z; i++) {
						//console.log(i);
						ids.push(res.body.panel.modules[i]);
					}



					pids.push(res.body.panel._id);



					done();
				});
		});

		//Loop through ids and get each module according to ID


		describe('Get Module', function() {
			for (i = 0; i < getmodule().length; i++) {


				it('Should return a module with the following type:\n' +
					'\t        {"type","question","answers","correct"}',
					function(done) {
						i--;


						var body = {};

						//Try to get module by ID and validate values against POSTed data.
						request(url)
							.get('/api/GET/module/' + ids[i])
							.send(body)
							.expect('Content-Type', /json/)
							.expect(200)
							.end(function(err, res) {

								if (err)
									throw err;


								res.body.should.have.property('question', a[i].question);
								res.body.should.have.property('type', a[i].type);

								res.body.should.have.property('answers', a[i].answers);
								res.body.should.have.property('_id'), a[i]._id;

								done();
							});
					});
			}

		});


		describe('POST Parser', function() {

			//Loops through sample modules and POSTs them.
			it('POST an array of strings to the parser', function(done) {
				//Set body to sample mod
				var body = {
					modules: makemodule()
				}

				request(url)
					.post('/api/POST/parser')
					.send(body)
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(err, res) {

						if (err)
							throw err;

						//check respond property to see if it has the parsed property
						res.body.should.have.property('error');
						res.body.should.have.property('modules');

						done();
					});
			});
		});

		describe('GET Panel', function() {
			it('GET the Panel from the database by its ID ', function(done) {
				i--;


				var body = {};



				//Try to get module by ID and validate values against POSTed data.
				request(url)
					.get('/api/GET/panel/' + pids[0])
					.send(body)
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(err, res) {

						if (err)
							throw err;


						res.body.should.have.property('_id');
						res.body.should.have.property('modules');


						done();

					});
			});


		});

		describe('POST Answer', function() {

			for (x = 0; x < getmodule().length; x++) {
				it('POST THE ANSWER INTO DATABASE AND GET ID BACK ', function(done) {
					x--;

					console.log('i: ' + x);


					var body = {
						correct: "helloNOOq",
						id: ids[x]
					};

					console.log(body);
					//{type:randomString(5,''),question:randomString(5,''),answers:[randomString(5,'')],correct:randomString(5,'')},



					//Try to get module by ID and validate values against POSTed data.
					request(url)
						.post('/api/POST/answer/')
						.send(body)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {

							if (err)
								throw err;


							res.body.should.have.property('_id');
							res.body.should.have.property('moduleId');
							res.body.should.have.property('correct');
							aids.push(res.body._id);
							console.log(JSON.stringify('aids[0]' + aids[x]));
							console.log(JSON.stringify('res.body.id' + res.body._id));

							done();

						});
				});
			}


		});



		describe('GET Answer by test ID', function() {
			for (r = 0; r < getmodule().length; r++) {
				it('GET the Answer from the database by its ID ', function(done) {
					r--;
					console.log('r: ' + r);



					var body = {};



					//Try to get module by ID and validate values against POSTed data.
					request(url)
						//.get('/api/GET/panel/'+pids[0])
						.get('/api/GET/test/answer/' + aids[r])
						.send(body)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {

							if (err)
								throw err;

							res.body.should.have.property('_id');
							res.body.should.have.property('moduleId');
							res.body.should.have.property('correct');
							//res.body.should.have.property('_id');
							//res.body.should.have.property('modules');
							//console.log('res.body'+JSON.stringify(res.text));
							console.log(res.body);
							done();

						});
				});
			}


		});
		describe('GET Answer by ID with no true answer answer', function() {
			for (k = 0; k < getmodule().length; k++) {
				it('GET check the Answer from the database by its ID then return a bool value', function(done) {
					k--;


					var body = {};



					//Try to get module by ID and validate values against POSTed data.
					request(url)
						//'/api/GET/answer/:id/:correct'
						.get('/api/GET/answer/' + aids[k] + '/' + 'helloNOOq')
						.send(body)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {

							if (err)
								throw err;

							res.body.should.equal(true);
							done();

						});
				});

			}
		});

		describe('PUT Answer by the ID with a new correct answer', function() {
			for (b = 0; b < getmodule().length; b++) {
				it('it will look for the id in the database and change it content', function(done) {
					b--;


					var body = {};



					//Try to get module by ID and validate values against POSTed data.
					request(url)
						//'/api/GET/answer/:id/:correct'
						.put('/api/PUT/answer/' + aids[b] + '/' + 'newanswerQ')
						.send(body)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {

							if (err)
								throw err;

							console.log(res.body);
							res.body.should.have.property('_id');
							res.body.should.have.property('moduleId');
							res.body.should.have.property('correct');
							//res.body.should.equal(true);
							done();

						});
				});
			}


		});

		describe('GET Answer by ID with a false answer', function() {
			for (j = 0; j < getmodule().length; j++) {
				it('GET check the Answer from the database by its ID then return a bool value', function(done) {
					j--;
					//console.log('j[i]: ' + a[j].answers);


					var body = {};



					//Try to get module by ID and validate values against POSTed data.
					request(url)
						//'/api/GET/answer/:id/:correct'
						.get('/api/GET/answer/' + aids[j] + '/' + a[j].answers)
						.send(body)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {

							if (err)
								throw err;
							console.log('log.body: ' + res.body);
							res.body.should.equal(false);
							done();

						});
				});

			}
		});

		//api/GET/answer/:id/:correct

		//get back an array of objects 

		//    	//Loops through sample modules and POSTs them.
		// 	it('POST ' + mods[1].data, function(done) {
		// 		//Set body to sample mod
		// 		var body = mods[1];

		// 		//console.log(mods[i]);

		// 		//Send to POST route for modules.
		// 	    request(url)
		// 	    	.post('/api/POST/code-submit')
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		//Check if id was assigned by mongo.
		// 	    		res.body.should.have.property('id');

		// 	    		//Push id to ids list.
		// 	    		ids.push(res.body.id);

		// 	    		//Validate response from server.
		// 	    		body.data.should.equal(res.body.module);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loops through sample modules and POSTs them.
		// 	it('POST ' + mods[2].data, function(done) {
		// 		//Set body to sample mod
		// 		var body = mods[2];

		// 		//console.log(mods[i]);

		// 		//Send to POST route for modules.
		// 	    request(url)
		// 	    	.post('/api/POST/code-submit')
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		//Check if id was assigned by mongo.
		// 	    		res.body.should.have.property('id');

		// 	    		//Push id to ids list.
		// 	    		ids.push(res.body.id);

		// 	    		//Validate response from server.
		// 	    		body.data.should.equal(res.body.module);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loops through sample modules and POSTs them.
		// 	it('POST ' + mods[3].data, function(done) {
		// 		//Set body to sample mod
		// 		var body = mods[3];

		// 		//console.log(mods[i]);

		// 		//Send to POST route for modules.
		// 	    request(url)
		// 	    	.post('/api/POST/code-submit')
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		//Check if id was assigned by mongo.
		// 	    		res.body.should.have.property('id');

		// 	    		//Push id to ids list.
		// 	    		ids.push(res.body.id);

		// 	    		//Validate response from server.
		// 	    		body.data.should.equal(res.body.module);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loops through sample modules and POSTs them.
		// 	it('POST ' + mods[4].data, function(done) {
		// 		//Set body to sample mod
		// 		var body = mods[4];

		// 		//console.log(mods[i]);

		// 		//Send to POST route for modules.
		// 	    request(url)
		// 	    	.post('/api/POST/code-submit')
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		//Check if id was assigned by mongo.
		// 	    		res.body.should.have.property('id');

		// 	    		//Push id to ids list.
		// 	    		ids.push(res.body.id);

		// 	    		//Validate response from server.
		// 	    		body.data.should.equal(res.body.module);

		// 	    		done();
		// 	    	});
		//    	});

		//    			for(i = 0; i< module_arr.length; i++)
		// 			{

		// 				var body = module_arr[i];

		// 			it('SHOULD POST SOME Q DATA' + module_arr[i].data, function(done) {
		// 				//Set body to sample mod
		// 				//var body = module_arr[i];
		// 				//console.log(mods[i]);

		// 				//Send to POST route for modules.
		// 			    request(url)
		// 			    	.post('/api/POST/code-submit')
		// 			    	.send(body)
		// 			    	.expect('Content-Type', /json/)
		// 			    	.expect(200)
		// 			    	.end(function(err,res){

		// 			    		if (err)
		// 			    			throw err;

		// 			    		//Check if id was assigned by mongo.
		// 			    		res.body.should.have.property('id');

		// 			    		//Push id to ids list.
		// 			    		ids.push(res.body.id);

		// 			    		//Validate response from server.
		// 			    		body.data.should.equal(res.body.module);

		// 			    		done();

		// 			    	});
		// 	    	});
		// 		}
		// });

		// //Get testing loops through ids from POSTed modules in POST testing.
		// //Validates that the data coming back from the server is what we POSTed.
		// /*					{data: '{"name":"multiple-choice","type":"radio","question":"Hello yall","answers":["asdf","dasf"]}'},
		// 				{data: '{"name":"multiple-select","type":"checkbox","question":"Hello yall","answers":["Quang","dasf"]}'},
		// 				{data: '{"name":"true-false","type":"radio","question":"Hello yall","answers":[]}'},
		// 				{data: '{"name":"video","type":"video","question":"","answers":[]}'},
		// 				{data: '{"name":"text-submit","type":"textbox","question":"","answers":[]}'}*/
		// describe('GET', function(){



		// 	for(q = 0; q< module_arr.length; q++)
		// 	{
		// 		var newq = q;
		// 	//Loop through ids and get each module according to ID
		// 	it('Q Get $$' + module_arr[q].data, function(done) {


		// 		//newq = q;
		// 		console.log('qids[i]');
		// 		console.log(ids[newq]);
		// 		console.log('q->');
		// 		console.log(newq);
		// 		//	console.log(ids[10]);
		// 		//console.log('module_arr len->');
		// 		//console.log(module_arr.length);
		// 		var body = {};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.get('/api/GET/modules/'+ids[newq])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res)
		// 	    	{

		// 	    		if (err)
		// 	    			throw err;

		// 	    		//console.log('mods:' );
		// 	    		//console.log(mods[newq]);
		// 	    		var parsed = JSON.parse(module_arr[newq].data);


		// 	    		res.body.should.have.property('_id',ids[newq]);
		// 	    		res.body.should.have.property('name', parsed.name);
		// 	    		res.body.should.have.property('type', parsed.type);
		// 	    		res.body.should.have.property('question', parsed.question);
		// 	    		res.body.should.have.property('answers', parsed.answers);

		// 	    		//console.log('parse lol:' );
		// 	    		//console.log(ids[0]);
		// 	    		//console.log('parse end!');

		// 	    		done();
		// 	    		q++;
		// 	    	});

		//    	});
		// }
		// 			    	//Loop through ids and get each module according to ID
		// 	it('Get ' + mods[0].data, function(done) {

		// 		var body = {};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.get('/api/GET/modules/'+ids[0])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		var parsed = JSON.parse(mods[0].data);

		// 	    		res.body.should.have.property('_id',ids[0]);
		// 	    		res.body.should.have.property('name', parsed.name);
		// 	    		res.body.should.have.property('type', parsed.type);
		// 	    		res.body.should.have.property('question', parsed.question);
		// 	    		res.body.should.have.property('answers', parsed.answers);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loop through ids and get each module according to ID
		// 	it('Get ' + mods[1].data, function(done) {

		// 		var body = {};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.get('/api/GET/modules/'+ids[1])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		var parsed = JSON.parse(mods[1].data);

		// 	    		res.body.should.have.property('_id',ids[1]);
		// 	    		res.body.should.have.property('name', parsed.name);
		// 	    		res.body.should.have.property('type', parsed.type);
		// 	    		res.body.should.have.property('question', parsed.question);
		// 	    		res.body.should.have.property('answers', parsed.answers);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loop through ids and get each module according to ID
		// 	it('Get ' + mods[2].data, function(done) {

		// 		var body = {};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.get('/api/GET/modules/'+ids[2])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		var parsed = JSON.parse(mods[2].data);

		// 	    		res.body.should.have.property('_id',ids[2]);
		// 	    		res.body.should.have.property('name', parsed.name);
		// 	    		res.body.should.have.property('type', parsed.type);
		// 	    		res.body.should.have.property('question', parsed.question);
		// 	    		res.body.should.have.property('answers', parsed.answers);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loop through ids and get each module according to ID
		// 	it('Get ' + mods[3].data, function(done) {

		// 		var body = {};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.get('/api/GET/modules/'+ids[3])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		var parsed = JSON.parse(mods[3].data);

		// 	    		res.body.should.have.property('_id',ids[3]);
		// 	    		res.body.should.have.property('name', parsed.name);
		// 	    		res.body.should.have.property('type', parsed.type);
		// 	    		res.body.should.have.property('question', parsed.question);
		// 	    		res.body.should.have.property('answers', parsed.answers);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loop through ids and get each module according to ID
		// 	it('Get ' + mods[4].data, function(done) {

		// 		var body = {};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.get('/api/GET/modules/'+ids[4])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		var parsed = JSON.parse(mods[4].data);

		// 	    		res.body.should.have.property('_id',ids[4]);
		// 	    		res.body.should.have.property('name', parsed.name);
		// 	    		res.body.should.have.property('type', parsed.type);
		// 	    		res.body.should.have.property('question', parsed.question);
		// 	    		res.body.should.have.property('answers', parsed.answers);

		// 	    		done();
		// 	    	});
		//    	});

		//    				//for(i =0; i<ids.length; i++)
		//    				//{
		//    						//console.log('id is: ');
		//    						//console.log(ids[i]);
		//    				//}



		// });

		// describe('Object Modification Check', function(){

		//    	for(i =0; i<10; i++)
		//    	{
		// 	//Loop through ids and get each module according to ID
		// 	var count;
		// 	it('Should change module name to "Changed!"', function(done) {
		// 		count = i - 10;
		// 		var body = {
		// 			data : "Changed!"
		// 		};

		// 		//console.log(mods[i]);
		// 		console.log(count);
		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.put('/api/PUT/modules/'+ids[count])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		res.body.name.should.equal(body.data);

		// 	    		done();
		// 	    		i++;
		// 	    	});
		//    	});
		// 	}
		// 	});
		// 	describe('PUT', function(){

		//    			//Loop through ids and get each module according to ID
		// 	it('Should change module name to "Changed!"', function(done) {

		// 		var body = {
		// 			data : "Changed!"
		// 		};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.put('/api/PUT/modules/'+ids[0])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		res.body.name.should.equal(body.data);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loop through ids and get each module according to ID
		// 	it('Should change module name to "Changed!"', function(done) {

		// 		var body = {
		// 			data : "Changed!"
		// 		};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.put('/api/PUT/modules/'+ids[1])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		res.body.name.should.equal(body.data);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loop through ids and get each module according to ID
		// 	it('Should change module name to "Changed!"', function(done) {

		// 		var body = {
		// 			data : "Changed!"
		// 		};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.put('/api/PUT/modules/'+ids[2])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		res.body.name.should.equal(body.data);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loop through ids and get each module according to ID
		// 	it('Should change module name to "Changed!"', function(done) {

		// 		var body = {
		// 			data : "Changed!"
		// 		};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.put('/api/PUT/modules/'+ids[3])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		res.body.name.should.equal(body.data);

		// 	    		done();
		// 	    	});
		//    	});

		//    	//Loop through ids and get each module according to ID
		// 	it('Should change module name to "Changed!"', function(done) {

		// 		var body = {
		// 			data : "Changed!"
		// 		};

		// 		//console.log(mods[i]);

		// 		//Try to get module by ID and validate values against POSTed data.
		// 	    request(url)
		// 	    	.put('/api/PUT/modules/'+ids[4])
		// 	    	.send(body)
		// 	    	.expect('Content-Type', /json/)
		// 	    	.expect(200)
		// 	    	.end(function(err,res){

		// 	    		if (err)
		// 	    			throw err;

		// 	    		res.body.name.should.equal(body.data);

		// 	    		done();
		// 	    	});
		//    	});
	});

});