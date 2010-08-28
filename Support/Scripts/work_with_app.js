// Runs various actions to work with the app in the emulator (all of them end in the app's identifier)

var utils = require('webos_utils');

action.performWithContext = function(context, options) {
	// Find our root folder
	var root = utils.commonOrRootFolder(context);
	if (root === false) {
		return false;
	}
	
	// Grab the contents of the appinfo.json file, and parse it from JSON
	var projectID = utils.getAppID(context, root);
	
	// Find the workspace folder
	var sharedFolder = root.substring(0, root.lastIndexOf('/')).replace(/ /, '\\ ');
	
	// Build out the command and run it
	var command = utils.prepCommand('cd ' + sharedFolder + '; ' + options.command + ' ' + projectID);
	var result = system.shell(command);
	system.log(result);
	return true;
}