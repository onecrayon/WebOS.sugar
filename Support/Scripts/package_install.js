// Packages and installs the WebOS application

require.global('mootools-server');
var utils = require('webos_utils');

action.performWithContext = function(context) {
	var root = utils.commonOrRootFolder(context);
	if (root === false) {
		return false;
	}
	
	// If we got here, we have the root folder, so grab its name (final segment)
	var projectFolder = root.substr(root.lastIndexOf('/') + 1)
	// And grab the folder above that so we can CD there (can't pass full path to palm-package, sadly)
	var sharedFolder = root.substring(0, root.lastIndexOf('/')).replace(/ /, '\\ ');
	// Grab the app ID to launch the app
	var projectID = utils.getAppID(context, root);
	// Run the package command
	var command = utils.prepCommand('cd ' + sharedFolder + '; palm-package --exclude="*.esproj" ' + projectFolder);
	var result = system.shell(command);
	// Check to make sure the result is what we want
	if (result.indexOf('creating package') < 0) {
		system.log('WebOS.sugar error: could not package app; exited with results: ' + result);
		return false;
	}
	// Log the result for our inquisitive users
	system.log(result);
	// Made it here, so grab the name of the IPK file
	var ipkFile = result.replace(/.*creating package (([a-z0-9_-]+\.?){2,}_([0-9]+\.?){3}_all\.ipk).*/, '$1');
	// Build and run the install command
	command = utils.prepCommand('cd ' + sharedFolder + '; palm-install ' + ipkFile);
	result = system.shell(command);
	// Log the result
	system.log(result);
	command = utils.prepCommand('palm-launch -i ' + projectID);
	result = system.shell(command);
	system.log(result);
	return true;
};