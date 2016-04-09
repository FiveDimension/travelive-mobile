//
//  DefConfig.m
//  NodeMediaClient-Demo
//
//  Created by Mingliang Chen on 15/8/30.
//  Copyright (c) 2015年 NodeMedia. All rights reserved.
//

#import "DefConfig.h"

@interface DefConfig()
@property (strong, nonatomic) NSUserDefaults *defaults;
@end

@implementation DefConfig

+(DefConfig*)sharedInstance {
    static DefConfig *defConfig;
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        defConfig = [[DefConfig alloc] init];
        defConfig.defaults = [NSUserDefaults standardUserDefaults];
    });
    return defConfig;
}
-(void)putPlayUrl:(NSString*)playUrl {
    [self.defaults setObject:playUrl forKey:@"playUrl"];
    [self.defaults synchronize];
}
-(void)putPublishUrl:(NSString*)publishUrl {

    [self.defaults setObject:publishUrl forKey:@"publishUrl"];
    [self.defaults synchronize];
}

-(NSString*)getPlayUrl {
    return [self.defaults stringForKey:@"playUrl"];
}
-(NSString*)getPublishUrl {
    return [self.defaults stringForKey:@"publishUrl"];
}
@end
