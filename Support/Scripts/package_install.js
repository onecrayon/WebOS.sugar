// Packages and installs the WebOS application

require.global('mootools-server');
var utils = require('webos_utils');

exports.main = function() {
	var root = NSString.stringWithString_(utils.commonFolder());
	if (!utils.checkForAppInfo(root)) {
		root = NSString.stringWithString_(utils.rootFolder());
		if (!utils.checkForAppInfo(root)) {
			system.log('WebOS.sugar error: could not find root of project to package and install. Please select the root folder and try again.');
			return false;
		}
	}
	
	// If we got here, we have the root folder, so grab its name (final segment)
	var projectFolder = root.substr(root.lastIndexOf('/') + 1)
	// And grab the folder above that so we can CD there (can't pass full path to palm-package, sadly)
	var sharedFolder = root.substring(0, root.lastIndexOf('/')).replace(/ /, '\\ ');
	// Run the package command
	var command = utils.prepCommand('cd ' + sharedFolder + '; palm-package ' + projectFolder);
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
	return true;
};