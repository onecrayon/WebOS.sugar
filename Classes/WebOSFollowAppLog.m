//
//  WebOSFollowAppLog.m
//  WebOS
//
//  Created by Ian Beck on 8/5/11.
//  Copyright 2011 One Crayon. All rights reserved.
//

#import "WebOSFollowAppLog.h"

@implementation WebOSFollowAppLog

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
    // Grab our appID
    NSString *appID = [self appIDForContext:context];
    if (appID == nil) {
        NSLog(@"WebOS.sugar: Unable to find appinfo.json for current project");
        return NO;
    }
    // Create our shell script to execute
	NSString *command = [NSString stringWithFormat:@"palm-log -f \"%@\"", appID];
	[self runCommandsInTerminal:command];
    
    return YES;
}

@end
