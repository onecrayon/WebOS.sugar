//
//  WebOSGenericAction.h
//  WebOS.sugar
//
//  Created by Ian Beck on 7/28/11.
//  Copyright 2011 One Crayon. All rights reserved.
//



@interface WebOSGenericAction : NSObject {
    
}

- (NSURL *)projectURLForContext:(id)context;
- (NSURL *)sharedURLForContext:(id)context;
- (BOOL)appInfoExistsForURL:(NSURL *)url;
- (NSURL *)appRootFolderForContext:(id)context;
- (NSString *)appIDForContext:(id)context;
- (NSString *)runCommands:(NSString *)commands withEnv:(NSDictionary *)env;

@end
