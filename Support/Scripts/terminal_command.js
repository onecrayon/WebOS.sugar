var utils = require('webos_utils');

action.performWithContext = function(context, options) {
	var script = NSBundle.bundleWithIdentifier_('com.onecrayon.Sugar.WebOS').bundlePath.stringByAppendingPathComponent_('Support/Tools/terminal-command.scpt');
	// Make sure that the Applescript is actually there
	if (system.isFile(script)) {
		script = utils.toUnixPath(script, true);
		// Execute our Applescript to open Terminal
		var command = 'osascript ' + script + ' "' + options.command.replace(/"/g, '\\"') + '"';
		system.log(command);
		var result = system.shell(command);
		system.log(result);
		return true;
	} else {
		return false;
	}
}