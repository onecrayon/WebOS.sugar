//
//  WebOSCommandInTerminal.m
//  WebOS
//
//  Created by Ian Beck on 8/5/11.
//  Copyright 2011 One Crayon. All rights reserved.
//

#import "WebOSCommandInTerminal.h"

@implementation WebOSCommandInTerminal

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
    // Execute our command
	[self runCommandsInTerminal:command];
    
    return YES;
}

@end
