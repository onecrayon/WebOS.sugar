require.global('mootools-server');

// Since bash doesn't load the user's profile, we have to manually add the SDK to the path
// Running all commands through this function achieves this
var prepCommand = function(command) {
	return 'export PATH="/opt/PalmSDK/Current/bin/:$PATH"; ' + command;
};

// Converts a file:// path into a standard Unix path; optionally safe for use on a shell
var toUnixPath = function(path, shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	if (path.lastIndexOf('/') == path.length - 1) {
		path = path.substring(0, path.length - 1);
	}
	var replacement = (shellSafe ? '\\ ' : ' ');
	path = path.replace(/file:\/\/(?:localhost)?(.+)/i, '$1');
	return path.replace(/(%20| )/, replacement);
};

// Returns the folder shared by the selected files
var commonFolder = function(shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	// Setup the shared root directory (allows working in sub-folders)
	var root = String(context.contextDirectoryForSelectedResources);
	return toUnixPath(root, shellSafe);
};

// Returns the root project folder
var rootFolder = function(shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	// Setup the shared root directory (allows working in sub-folders)
	var root = String(context.rootURL);
	return toUnixPath(root, shellSafe);
};

var commonOrRootFolder = function(shellSafe) {
	var root = NSString.stringWithString_(commonFolder());
	if (!checkForAppInfo(root)) {
		root = NSString.stringWithString_(rootFolder());
		if (!checkForAppInfo(root)) {
			system.log('WebOS.sugar error: could not find root of project to package and install. Please select the root folder and try again.');
			return false;
		}
	}
	return root;
};

// Grabs a shell variable and returns it, or the default if none
var getShellVar = function(varName, defaultText) {
	var shellVars = new Hash();
	NSUserDefaults.standardUserDefaults.objectForKey_('TEAShellVariables').each(function(item) {
		shellVars.set(item.variable, item.value);
	});
	if (shellVars.has(varName)) {
		return shellVars.get(varName);
	} else {
		return defaultText;
	}
};

// Checks to see if appinfo.json is in the specified directory
var checkForAppInfo = function(path) {
	var target = path.stringByAppendingPathComponent_('appinfo.json');
	if (NSFileManager.defaultManager.fileExistsAtPath_(target)) {
		return true;
	} else {
		return false;
	}
}

var getAppID = function(root) {
	// If no root, then find it!
	if ($type(root) != 'string') {
		var root = commonOrRootFolder();
		if (root === false) {
			return '';
		}
	}
	// Grab the contents of the appinfo.json file, and parse it from JSON
	var appInfoFile = root.stringByAppendingPathComponent_('appinfo.json');
	var appInfo = JSON.decode(String(SpiceController.read_(appInfoFile)));
	return appInfo.id;
}

exports.prepCommand = prepCommand;

exports.toUnixPath = toUnixPath;
exports.commonFolder = commonFolder;
exports.rootFolder = rootFolder;
exports.commonOrRootFolder = commonOrRootFolder;

exports.getShellVar = getShellVar;

exports.checkForAppInfo = checkForAppInfo;
exports.getAppID = getAppID;