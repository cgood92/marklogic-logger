#!/usr/bin/env node

// Imports
var readline = require('readline'),
	dataFormatter = require('./lib/dataFormatter');

// Set encoding
process.stdin.setEncoding('utf8');

// Set formatting config
dataFormatter.config({
	level: process.env.LEVEL || 4
});

// Creating our interface for stdin/stdout
var controller = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Print out test message
dataFormatter.welcome();

// Listening to data coing in from stdin
controller.on('line', function(line){
	var formatted = dataFormatter.format(line);
	if (formatted) {
		console.log(formatted);
	}
});