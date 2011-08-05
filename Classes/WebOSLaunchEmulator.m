//
//  WebOSLaunchEmulator.m
//  WebOS
//
//  Created by Ian Beck on 8/5/11.
//  Copyright 2011 One Crayon. All rights reserved.
//

#import "WebOSLaunchEmulator.h"

@implementation WebOSLaunchEmulator

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
    return [[NSWorkspace sharedWorkspace] launchApplication:@"Palm Emulator"];
}

@end
