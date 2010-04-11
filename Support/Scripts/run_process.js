// Simply runs a command passed by the Actions.xml

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