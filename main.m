//
//  main.m
//  netgame
//
//  Created by Matt Biddulph on 14/07/2010.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import <UIKit/UIKit.h>

int main(int argc, char *argv[]) {
	NSAutoreleasePool *pool = [NSAutoreleasePool new];
	int retVal = UIApplicationMain(argc, argv, nil, @"netgameAppDelegate");
	[pool release];
	return retVal;
}
