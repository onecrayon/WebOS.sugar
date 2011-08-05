//
//  WebOSCommandInTerminal.h
//  WebOS
//
//  Created by Ian Beck on 8/5/11.
//  Copyright 2011 One Crayon. All rights reserved.
//

#import "WebOSGenericAction.h"

@interface WebOSCommandInTerminal : WebOSGenericAction

- (BOOL)performActionWithContext:(id)context error:(NSError **)outError;

@end
