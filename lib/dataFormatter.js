// Imports
var colors = require('colors');

// Default config
var config = {
	level: 1
};

var removeTime = function(line){
	return line.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} /, '');
};

var removeApp = function(line){
	return line.replace(/^[a-zA-Z0-9\-_\.]+: /, '');
};

var showOnlyImportant = function(line){
	// TODO
	if (true) {
		return line;
	}
};

var strip = function(line) {
	var minusLevel = line.replace(findLevel(line) + ": ", '');
	switch(config.level) {
		case 1:
			return minusLevel;
		case 2:
			return removeTime(minusLevel);
		case 3:
			return removeApp(removeTime(minusLevel));
		case 4:
			return showOnlyImportant(removeApp(removeTime(minusLevel)));
	}
};

var findLevel = function(line) {
	var match = removeTime(line).match(/[a-zA-Z0-9\-]+:/);
	if (match) {
		return match[0].slice(0, -1);
	} else {
		return "Info";
	}
};

var determineColor = function(line) {
	var level = findLevel(line);
	switch(level){
		case "Info":
			return "white";
		case "Notice":
			return "red";
		default: 
			return "white";
	}
};

var format = function(line) {
	var color = determineColor(line),
		clean = strip(line);
	if (clean) {
		return colors[color](clean);
	}
};

// Overwrite specified settings
var setConfig = function(passedIn) {
	for (let i in passedIn) {
		config[i] = passedIn[i];
	}
	console.log('Configuration: ', config);
};

var welcome = function() {
	console.log(colors.rainbow('Welcome to MarkLogic-logger'));
};

module.exports = {
	format,
	strip,
	determineColor,
	welcome,
	config: setConfig
};