//
//  WebOSPackageAndInstall.m
//  WebOS
//
//  Created by Ian Beck on 8/5/11.
//  Copyright 2011 One Crayon. All rights reserved.
//

#import "WebOSPackageAndInstall.h"

@implementation WebOSPackageAndInstall

- (id)init
{
    self = [super init];
    if (self) {
        // Initialization code here.
    }
    
    return self;
}

- (BOOL)performActionWithContext:(id)context error:(NSError **)outError
{
    // We need two things to construct our package command: the appinfo.json folder name and path to the parent folder
    NSURL *projectFolder = [self appRootFolderForContext:context];
    if (projectFolder == nil) {
        NSLog(@"WebOS.sugar: Unable to find appinfo.json for current project");
        return NO;
    }
    NSString *projectName = [projectFolder lastPathComponent];
    NSString *sharedFolder = [[projectFolder URLByDeletingLastPathComponent] path];
    // Grab the appID so we can launch it afterward
    NSDictionary *appInfo = [self appInfoForContext:context];
    NSString *packageCommand = [NSString stringWithFormat:@"cd %@; palm-package --exclude=\"*.esproj\" %@", sharedFolder, projectName, nil];
	// Run the package command
    NSString *result = [self runCommands:packageCommand withEnv:nil];
	// Check to make sure the result is what we want
    NSRange containsText = [result rangeOfString:@"creating package"];
    if (containsText.location == NSNotFound) {
        NSLog(@"WebOS.sugar error: could not package app. Exited with results: %@", result);
        return NO;
    }
	// Log result for our inquisitive users
	NSLog(@"%@", result);
	// Made it here, so construct the name of the IPK file and install it
    NSString *ipkFile = [NSString stringWithFormat:@"%@_%@_all.ipk", [appInfo objectForKey:@"id"], [appInfo objectForKey:@"version"], nil];
    NSString *installCommand = [NSString stringWithFormat:@"cd \"%@\"; palm-install %@", sharedFolder, ipkFile, nil];
    NSLog(@"%@", [self runCommands:installCommand withEnv:nil]);
    // Launch the app
    NSString *launchCommand = [NSString stringWithFormat:@"palm-launch %@", [appInfo objectForKey:@"id"], nil];
    NSLog(@"%@", [self runCommands:launchCommand withEnv:nil]);
    return YES;
}

@end
