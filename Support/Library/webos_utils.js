require.global('mootools-server');

// Since bash doesn't load the user's profile, we have to manually add the SDK to the path
// Running all commands through this function achieves this
var prepCommand = function(command) {
	return 'export PATH="/opt/PalmSDK/Current/bin/:$PATH"; ' + command;
};

// Converts a file:// path into a standard Unix path; optionally safe for use on a shell
var toUnixPath = function(path, shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	var replacement = (shellSafe ? '\\ ' : ' ');
	path = path.replace(/file:\/\/(?:localhost)?(.+)/i, '$1');
	return path.replace(/%20/, replacement);
};

// Returns the folder shared by the selected files
var commonFolder = function(shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	var root = '';
	// Setup the shared root directory (allows working in sub-folders)
	root = String(context.contextDirectoryForSelectedResources);
	if (root.lastIndexOf('/') == root.length - 1) {
		root = substr(root.length - 2);
	}
	return toUnixPath(root, shellSafe);
	return root;
};

// Returns the root project folder
var rootFolder = function(shellSafe) {
	var shellSafe = (!$chk(shellSafe) ? false : shellSafe);
	var root = '';
	// TODO: finish this implementation
};

exports.prepCommand = prepCommand;

exports.toUnixPath = toUnixPath;
exports.commonFolder = commonFolder;