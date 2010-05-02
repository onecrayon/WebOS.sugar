var utils = require('webos_utils');

exports.main = function() {
	var script = SpiceController.bundlePath.stringByAppendingPathComponent_('Support/Tools/palm-log.scpt');
	// Make sure that the Applescript is actually there
	if (SpiceController.isFile_(script)) {
		var projectID = utils.getAppID();
		script = utils.toUnixPath(script, true);
		// Execute our Applescript (which opens Terminal with the palm-log command
		var command = 'osascript ' + script + ' ' + projectID;
		var result = system.shell(command);
		system.log(result);
		return true;
	} else {
		return false;
	}
}