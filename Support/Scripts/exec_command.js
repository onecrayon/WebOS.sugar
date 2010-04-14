// Simply runs a command passed by the Actions.xml
// This is mainly a proof of concept and for testing purposes

var utils = require('webos_utils');

exports.main = function(command) {
	var cmd = utils.prepCommand(command);
	var result = system.shell(cmd);
	if (!result) {
		return false;
	} else {
		system.log(result);
		return true;
	}
};