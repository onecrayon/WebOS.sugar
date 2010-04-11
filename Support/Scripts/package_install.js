// Packages and installs the WebOS application

require.global('mootools-server');
var utils = require('webos_utils');

exports.main = function() {
	var root = NSString.stringWithString(utils.commonFolder());
	// TODO: I should come up with a cleaner way to do this, but for now this works
	var target = root.stringByAppendingPathComponent_('appinfo.json');
	system.log('Our target is: ' + String(target));
	if (NSFileManager.defaultManager.fileExistsAtPath_(target)) {
		system.log(String(root) + ' is what we want');
	} else {
		system.log(String(root) + ' is total crap');
	}
	
	return true;
};