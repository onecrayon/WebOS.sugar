// Generates a new application in the current project folder

var utils = require('webos-utils');

exports.main = function() {
	var root = '';
	// Since the bash profile isn't loaded for the user, make sure we have the WebOS SDK executables in the path
	root = String(context.contextDirectoryForSelectedResources);
	if (root.lastIndexOf('/') == root.length - 1) {
		root = substr(root.length - 2);
	}
	root = root.replace(/file:\/\/(?:localhost)?(.+)/i, '$1');
	root = root.replace(/%20/, '\\ ');
	var finalFolder = root.substr(root.lastIndexOf('/') + 1);
	var command = utils.prepCommand('palm-generate -p "{title:\'' + finalFolder + '\', id:com.mydomain.' + finalFolder.toLowerCase() + ', version:\'1.0.0\'}" ' + root);
	system.log(system.bash(command));
	return true;
}