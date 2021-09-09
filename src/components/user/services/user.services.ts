import {UserModel} from "@/components/user/models/user.model";
import {FollowService} from "@/components/follow/services/follow.service";
import {TweetServices} from "@/components/tweet/services/tweet.services";
import {LikeServices} from "@/components/like/services/like.services";
import {RetweetServices} from "@/components/retweet/services/retweet.services";

//'userName', 'name','password','mail','phone','birthDate'

export class UserService{
    public static createUser({
        name, userName,password,mail, phone, birthDate,biography,location,website
    }: {
        name: string;
        userName: string;
        password: string;
        mail: string;
        phone: string;
        birthDate: string;
        biography?: string;
        location?: string;
        website?: string;
    }) {
        return UserModel.query().insert({
            name,
            userName,
            password,
            mail,
            phone,
            birthDate,
            biography,
            location,
            website
        });
    }

    public static findUserById(id: string) {
        return UserModel.query().findOne({id: id, isActive: true});
    }

    public static async findUserByUserName(userName: string) {
        const user = await UserModel.query().findOne({userName: userName, isActive: true});
        if (!user) throw new Error('User not found');
        return user;
    }

    public static findAllUsers() {
        return UserModel.query().where({
            isActive: true,
        });
    }

    public static async updateUser(data: Partial<UserModel>, {userName}: { userName: string }) {
        const user = await this.findUserByUserName(userName);
        if (!user) throw new Error('User not found');
        return user.$query().patchAndFetch(data);
    }
    public static async markAsDeleted(id: string) {

        const tweets = await TweetServices.findAllTweetsFromUser({userId:id});
        const followed = await FollowService.findUserFollows({followerUserId:id});
        const followers = await FollowService.findUserFollowers({followedUserId:id});
        const likes = await LikeServices.findLikesFromUser({userId:id});
        const retweets = await RetweetServices.findRetweetsFromUser({userRetweeterId:id})

        //For loops to set isActive to false.
        const tweetsPromise = tweets.map((tweet) =>{
            return TweetServices.markAsDeleted(tweet.id)
        });
        const followedPromise = followed.map((follow) =>{
            return FollowService.markAsDeleted(follow.id);
        });
        const followersPromise =followers.map((follower) =>{
            return FollowService.markAsDeleted(follower.id);
        });
        const likesPromise =likes.map((like) =>{
            return LikeServices.markAsDeleted(like.id);
        });
        const retweetsPromise =retweets.map((retweet) =>{
            return RetweetServices.markAsDeleted(retweet.id);
        });
        await Promise.all(tweetsPromise);
        await Promise.all(followersPromise);
        await Promise.all(followedPromise);
        await Promise.all(likesPromise);
        await Promise.all(retweetsPromise);

        return UserModel.query().patchAndFetchById(id, { isActive: false });
    }

    public static async feed(userName: string) {
        const user = await UserModel.query().findOne({userName: userName, isActive: true});
        //TWEETS DE LOS FOLLOWED
        const following = await FollowService.findUserFollows({followerUserId: user.id}, false)
        return Promise.all((following.map((follows) => {
            return TweetServices.findAllTweetsFromUser({userId: follows.followedUserId}, false)
        })))
    }
}