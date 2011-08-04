//
//  WebOSGenericAction.m
//  WebOS.sugar
//
//  Created by Ian Beck on 7/28/11.
//  Copyright 2011 One Crayon. All rights reserved.
//

/* TODO:
   - Add generic methods for finding root of the project (webos-utils port, essentially)
   - Figure out how to parse JSON without causing namespace problems with other apps that need JSON parsing
   - Add generic method for running shell scripts (port of Spice system.shell method?)
 */

#import "WebOSGenericAction.h"

@implementation WebOSGenericAction

- (id)init
{
    self = [super init];
    if (self) {
        // Initialization code here.
    }
    
    return self;
}

@end
