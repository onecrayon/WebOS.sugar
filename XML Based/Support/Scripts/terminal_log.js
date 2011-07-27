var utils = require('webos_utils');

action.performWithContext = function(context) {
	// TODO: add a way in Spice to easily get the bundle/support path without this rigamarole
	var script = NSBundle.bundleWithIdentifier_('com.onecrayon.Sugar.WebOS').bundlePath.stringByAppendingPathComponent_('Support/Tools/palm-log.scpt');
	// Make sure that the Applescript is actually there
	if (system.isFile(script)) {
		var projectID = utils.getAppID(context);
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