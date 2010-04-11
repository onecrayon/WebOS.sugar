exports.main = function(command) {
	var result = system.bash(command);
	// TODO: should really check to see if its an error, and alert the user if so
	system.log(result);
	return true;
};