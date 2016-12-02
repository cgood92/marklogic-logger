// Imports
var should = require('should'),
	dataFormatter = require('../dataFormatter');

describe('Testing the strip functions', () => {
	describe('Testing level 1', () => {
		it ('Test 1', () => {
			dataFormatter.config({level: 1});
			var actual = dataFormatter.strip('2016-11-30 20:03:07.948 Info: Forest Documents state changed from mounted to recovering')
			var expected = '2016-11-30 20:03:07.948 Forest Documents state changed from mounted to recovering';
			return should(actual).equal(expected);
		});
	});
	describe('Testing level 2', () => {
		it ('Test 1', () => {
			dataFormatter.config({level: 2});
			var actual = dataFormatter.strip('2016-11-30 20:10:52.898 Info: App-Services: Hello world with timestamp 2016-11-30 20:10:52.898 Info:');
			var expected = 'App-Services: Hello world with timestamp 2016-11-30 20:10:52.898 Info:';
			return should(actual).equal(expected);
		});
	});
	describe('Testing level 3', () => {
		it ('Test 1', () => {
			dataFormatter.config({level: 3});
			var actual = dataFormatter.strip('2016-11-30 20:10:52.898 Info: App-Services: Hello world with timestamp 2016-11-30 20:10:52.898 Info:');
			var expected = 'Hello world with timestamp 2016-11-30 20:10:52.898 Info:';
			return should(actual).equal(expected);
		});
	});
	describe('Testing level 4', () => {
		it ('Test 1', () => {
			dataFormatter.config({level: 4});
			var actual = dataFormatter.strip('2016-11-30 20:10:52.898 Info: App-Services: Hello world with timestamp 2016-11-30 20:10:52.898 Info:');
			var expected = 'Hello world with timestamp 2016-11-30 20:10:52.898 Info:';
			return should(actual).equal(expected);
		});
	});
});

describe('Testing the determineColor function', () => {
	it ('Test 1 - info', () => {
		var actual = dataFormatter.determineColor('2016-11-30 20:10:52.898 Info: App-Services: Hello world with timestamp 2016-11-30 20:10:52.898 Info:');
		var expected = 'white';
		return should(actual).equal(expected);
	});
	it ('Test 2 - error', () => {
		var actual = dataFormatter.determineColor('2016-11-30 20:10:52.898 Error: App-Services: Hello world with timestamp 2016-11-30 20:10:52.898 Info:');
		var expected = 'red';
		return should(actual).equal(expected);
	});
});
