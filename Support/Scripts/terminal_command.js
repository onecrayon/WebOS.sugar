var utils = require('webos_utils');

exports.main = function(command) {
	var script = SpiceController.bundlePath.stringByAppendingPathComponent_('Support/Tools/terminal-command.scpt');
	// Make sure that the Applescript is actually there
	if (SpiceController.isFile_(script)) {
		script = utils.toUnixPath(script, true);
		// Execute our Applescript to open Terminal
		var command = 'osascript ' + script + ' "' + command.replace(/"/g, '\\"') + '"';
		system.log(command);
		var result = system.shell(command);
		system.log(result);
		return true;
	} else {
		return false;
	}
}