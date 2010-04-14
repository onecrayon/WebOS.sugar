// Runs various actions to work with the app in the emulator (all of them end in the app's identifier)

var utils = require('webos_utils');

exports.main = function(cmdPrefix) {
	// Find our root folder
	// TODO: DUPLICATE CODE WITH package_install.js, MOVE TO UTILS?
	var root = NSString.stringWithString_(utils.commonFolder());
	if (!utils.checkForAppInfo(root)) {
		root = NSString.stringWithString_(utils.rootFolder());
		if (!utils.checkForAppInfo(root)) {
			system.log('WebOS.sugar error: could not find root of project. Please select the root folder and try again.');
			return false;
		}
	}
	
	// Grab the contents of the appinfo.json file, and parse it from JSON
	var appInfoFile = root.stringByAppendingPathComponent_('appinfo.json');
	var appInfo = JSON.decode(String(SpiceController.read_(appInfoFile)));
	var projectID = appInfo.id;
	
	// Find the workspace folder
	var sharedFolder = root.substring(0, root.lastIndexOf('/')).replace(/ /, '\\ ');
	
	// Build out the command and run it
	var command = utils.prepCommand('cd ' + sharedFolder + '; ' + cmdPrefix + ' ' + projectID);
	var result = system.shell(command);
	system.log(result);
	return true;
}