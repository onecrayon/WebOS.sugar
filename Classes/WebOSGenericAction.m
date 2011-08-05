//
//  WebOSGenericAction.m
//  WebOS.sugar
//
//  Created by Ian Beck on 7/28/11.
//  Copyright 2011 One Crayon. All rights reserved.
//

#import "WebOSGenericAction.h"
#import "SBJson.h"

// HACK: these are not exposed in the public Espresso API, but we need them to properly locate shared and project directories
// DON'T TRY THIS AT HOME! YOUR SUGAR WILL LIKELY BREAK WITH FUTURE ESPRESSO UPDATES
@interface NSObject (WebOSFileActionDeliciousness)
@property(readonly) NSURL *contextDirectoryURL;
@property(readonly) id document;
@end

@implementation WebOSGenericAction

- (id)init
{
	self = [super init];
	if (self) {
		// Initialization code here.
	}
	
	return self;
}

# pragma Shared Espresso protocol calls

- (BOOL)canPerformActionWithContext:(id)context
{
    return YES;
}

# pragma Shared utility methods

- (NSURL *)projectURLForContext:(id)context
{
    id doc = [[context windowForSheet] document];
	if ([[doc className] isEqualToString:@"ESProjectDocument"]) {
		return [doc directoryURL];
	} else {
		return nil;
	}
}

- (NSURL *)sharedURLForContext:(id)context
{
    NSURL *root = [context contextDirectoryURL];
	if (root == nil) {
		// Means there's only one file selected, so grab its URL
		root = [[context URLs] objectAtIndex:0];
		// Check if the path is a directory
		NSNumber *isDir;
		[root getResourceValue:&isDir forKey:NSURLIsDirectoryKey error:NULL];
		if ([isDir boolValue]) {
			root = [root URLByDeletingLastPathComponent];
		}
	}
	return root;
}

- (BOOL)appInfoExistsForURL:(NSURL *)url
{
    NSURL *target = [url URLByAppendingPathComponent:@"appinfo.json"];
    return [target checkResourceIsReachableAndReturnError:NULL];
}

- (NSURL *)appRootFolderForContext:(id)context
{
    NSURL *root = [self sharedURLForContext:context];
    if (![self appInfoExistsForURL:root]) {
        root = [self projectURLForContext:context];
        if (![self appInfoExistsForURL:root]) {
            NSLog(@"WebOS.sugar error: could not find root of project to package and install. PLease select the root folder and try again.");
            return nil;
        }
    }
    return root;
}

- (NSString *)appIDForContext:(id)context
{
    NSURL *root = [self appRootFolderForContext:context];
    if (root == nil) {
        // We cannot find the appInfo.json file
        return nil;
    }
    // Grab the contents of the file and parse as JSON
    NSDictionary *appInfo = [[NSString stringWithContentsOfFile:[root path] encoding:NSUTF8StringEncoding error:NULL] JSONValue];
    return [appInfo objectForKey:@"id"];
}

- (NSString *)runCommands:(NSString *)commands withEnv:(NSDictionary *)env
{
    // Configure our arguments array
    NSArray *args = [NSArray arrayWithObjects:@"-c", commands, nil];
    
	// Run the shell commands
	NSTask *task = [[NSTask alloc] init];
	NSPipe *inPipe = [NSPipe pipe], *outPipe = [NSPipe pipe];
	
	// Set up the STDIN; temporarily disabled but we might want it later
	//	NSFileHandle *fh = [inPipe fileHandleForWriting];  
	//	[fh writeData:[inputStr dataUsingEncoding:NSUTF8StringEncoding]];  
	//	[fh closeFile];
	
	[task setLaunchPath:@"/bin/sh"];
    [task setArguments:args];
	[task setStandardOutput:outPipe];
	[task setStandardError:outPipe];
	[task setStandardInput:inPipe];
    
    // Setup environment
    NSMutableDictionary *environment = [NSMutableDictionary dictionaryWithDictionary:env];
    // We always have to add our SDK binaries to the path, so do that
    [environment setObject:@"/opt/PalmSDK/Current/bin/:$PATH" forKey:@"PATH"];
    [task setEnvironment:environment];
	
	[task launch];
	
	NSData *data;
	NSString *outString = nil;
	data = [[outPipe fileHandleForReading] readDataToEndOfFile];
	outString = [[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding] autorelease];
	
	[task waitUntilExit];
	[task release];
	
	return outString;
}

@end
