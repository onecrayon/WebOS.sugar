// Since bash doesn't load the user's profile, we have to manually add the SDK to the path
// Running all commands through this function achieves this
exports.prepCommand = function(command) {
	return 'export PATH="/opt/PalmSDK/Current/bin/:$PATH"; ' + command;
};