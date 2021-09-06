import {TweetModel} from "@/components/tweet/models/tweet.model";
import {UserModel} from "@/components/user/models/user.model";

export class TweetServices{
    public static createTweet({
        text, userID, parentTweetID
                              }: {
        text: string;
        userID: string;
        parentTweetID?: string;
    }){
        return TweetModel.query().insert({text, userID, parentTweetID});
    }
    public static findTweetById(id: string){
        return TweetModel.query().findOne({id:id, isActive:true});
    }
    public static findAllTweets(){
        return TweetModel.query().where({
            isActive: true,
        });
    }
    public static markAsDeleted(id: string) {
        return TweetModel.query().patchAndFetchById(id, { isActive: false });
    }
    public static findAllTweetsFromUser(userID: string){
        return   TweetModel.query().where({
            userID:  userID,
            isActive: true,
        });

    }
}