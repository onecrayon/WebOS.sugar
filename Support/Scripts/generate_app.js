// Generates a new application in the current project folder

var utils = require('webos_utils');

exports.main = function() {
	var root = '';
	// Setup the shared root directory (allows setting up app in sub-folder)
	root = String(context.contextDirectoryForSelectedResources);
	if (root.lastIndexOf('/') == root.length - 1) {
		root = substr(root.length - 2);
	}
	// Parse out file://localhost and any space placeholders
	root = root.replace(/file:\/\/(?:localhost)?(.+)/i, '$1');
	root = root.replace(/%20/, '\\ ');
	// We'll use the folder name for the default project name, so grab it
	var finalFolder = root.substr(root.lastIndexOf('/') + 1);
	// Since the bash profile isn't loaded for the user, make sure we have the WebOS SDK executables in the path using our utility function
	var command = utils.prepCommand('palm-generate -p "{title:\'' + finalFolder + '\', id:com.mydomain.' + finalFolder.toLowerCase() + ', version:\'1.0.0\'}" ' + root);
	// Might want to add better error handling here
	var result = system.shell(command);
	if (!result) {
		return false;
	} else {
		system.log(result);
		return true;
	}
}