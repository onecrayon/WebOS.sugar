// Basic replacements for Mootools functions of old

function $chk(obj) {
	return !!(obj || obj === 0);
}

var JSON = {};

JSON.decode = function(string, secure){
	if (typeof string !== 'string' || !string.length) return null;
	if (secure && !(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, ''))) return null;
	return eval('(' + string + ')');
};

// Since bash doesn't load the user's profile, we have to manually add the SDK to the path
// Running all commands through this function achieves this
var prepCommand = function(command) {
	return 'export PATH="/opt/PalmSDK/Current/bin/:$PATH"; ' + command;
};

// Converts a file:// path into a standard Unix path; optionally safe for use on a shell
var toUnixPath = function(path, shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	// Make sure we have a real Javascript string, not an NSString
	path = String(path);
	if (path.lastIndexOf('/') == path.length - 1) {
		path = path.substring(0, path.length - 1);
	}
	var replacement = (shellSafe ? '\\ ' : ' ');
	path = path.replace(/file:\/\/(?:localhost)?(.+)/i, '$1');
	return path.replace(/(%20| )/, replacement);
};

// Returns the folder shared by the selected files
var commonFolder = function(context, shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	// Setup the shared root directory (allows working in sub-folders)
	var root = context.contextDirectoryURL;
	if (root == null) {
		// Means there's only one file selected, so grab its URL
		root = context.URLs.objectAtIndex_(0);
		// Check if the path is a directory
		var isDir = new outArgument;
		root.getResourceValue_forKey_error_(isDir, NSURLIsDirectoryKey, null);
		if (isDir.outValue.boolValue) {
			root = root.URLByDeletingLastPathComponent;
		}
	}
	return toUnixPath(root, shellSafe);
};

// Returns the root project folder
var rootFolder = function(context, shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	// Setup the shared root directory (allows working in sub-folders)
	// Well, this is a fine mess; E 2.0 no longer offers rootURL, so we have to go digging for it
	var doc = context.windowForSheet.document;
	if (doc.className == 'ESProjectDocument') {
		var root = doc.directoryURL.path;
		return toUnixPath(root, shellSafe);
	} else {
		return null;
	}
};

var commonOrRootFolder = function(context, shellSafe) {
	var root = NSString.stringWithString_(commonFolder(context));
	if (!checkForAppInfo(root)) {
		root = NSString.stringWithString_(rootFolder(context));
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
	if (path === null) {
		return false;
	}
	var target = path.stringByAppendingPathComponent_('appinfo.json');
	if (system.isFile(target)) {
		return true;
	} else {
		return false;
	}
}

var getAppID = function(context, root) {
	// If no root, then find it!
	if (typeof root !== 'string') {
		var root = commonOrRootFolder(context);
		if (root === false) {
			return '';
		}
	}
	// Grab the contents of the appinfo.json file, and parse it from JSON
	var appInfoFile = root.stringByAppendingPathComponent_('appinfo.json');
	var appInfo = JSON.decode(String(system.read(appInfoFile)));
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