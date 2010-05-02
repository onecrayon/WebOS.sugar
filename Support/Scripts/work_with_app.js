// Runs various actions to work with the app in the emulator (all of them end in the app's identifier)

var utils = require('webos_utils');

exports.main = function(cmdPrefix) {
	// Find our root folder
	var root = utils.commonOrRootFolder();
	if (root === false) {
		return false;
	}
	
	// Grab the contents of the appinfo.json file, and parse it from JSON
	var projectID = utils.getAppID(root);
	
	// Find the workspace folder
	var sharedFolder = root.substring(0, root.lastIndexOf('/')).replace(/ /, '\\ ');
	
	// Build out the command and run it
	var command = utils.prepCommand('cd ' + sharedFolder + '; ' + cmdPrefix + ' ' + projectID);
	var result = system.shell(command);
	system.log(result);
	return true;
}