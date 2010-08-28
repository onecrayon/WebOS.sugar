// Generates a new application in the current project folder

var utils = require('webos_utils');

action.performWithContext = function(context) {
	var root = utils.commonFolder(context, true);
	// We'll use the folder name for the default project name, so grab it
	var finalFolder = root.substr(root.lastIndexOf('/') + 1);
	// Since the bash profile isn't loaded for the user, make sure we have the WebOS SDK executables in the path using our utility function
	var command = utils.prepCommand('palm-generate -p "{title:\'' + finalFolder + '\', id:' + utils.getShellVar('REVERSE_DOMAIN', 'com.mydomain') + '.' + finalFolder.toLowerCase() + ', version:\'1.0.0\', vendor:\'' + utils.getShellVar('COMPANY', 'My Company') + '\'}" ' + root);
	// Might want to add better error handling here
	var result = system.shell(command);
	if (!result) {
		return false;
	} else {
		system.log(result);
		return true;
	}
}