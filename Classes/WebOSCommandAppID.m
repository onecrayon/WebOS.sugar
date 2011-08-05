//
//  WebOSCommandAppID.m
//  WebOS
//
//  Created by Ian Beck on 8/5/11.
//  Copyright 2011 MacRabbit. All rights reserved.
//

#import "WebOSCommandAppID.h"

@implementation WebOSCommandAppID

- (id)initWithDictionary:(NSDictionary *)dictionary bundlePath:(NSString *)bundlePath
{
    self = [super init];
	if (self == nil)
		return nil;
    
    command = [[dictionary objectForKey:@"command"] retain];
	
	return self;   
}

- (void)dealloc
{
    MRRelease(command);
}

- (BOOL)performActionWithContext:(id)context error:(NSError **)outError
{
    NSURL *root = [self appRootFolderForContext:context];
    if (root == nil) {
        NSLog(@"WebOS.sugar: Unable to find appID for current project");
        return NO;
    }
    NSString *appID = [self appIDForContext:context];
    NSURL *sharedFolder = [root URLByDeletingLastPathComponent];
    NSString *cdSharedFolder = [NSString stringWithFormat:@"cd \"%@\";", [sharedFolder path], nil];
    NSString *finalCommand = [NSString stringWithFormat:@"%@ %@ %@", cdSharedFolder, command, appID, nil];
    NSLog([self runCommands:finalCommand withEnv:nil]);
    return YES;
}

@end
