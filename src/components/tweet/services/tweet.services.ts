import {TweetModel} from "@/components/tweet/models/tweet.model";
import {UserService} from "@/components/user/services/user.services";
import Objection from "objection";

export class TweetServices{
    public static async createTweet({
        text, userID, parentTweetID
                              }: {
        text: string;
        userID: string;
        parentTweetID?: string;
    }){
        const user = await UserService.findUserById(userID);
        if(!user) throw new Error('User not found');
        //const parentTweet = await TweetServices.findTweetById(parentTweetID);
        return TweetModel.query().insert({text, userID: user.id, parentTweetID});
    }
    public static findTweetById({id}: {id:string},fetchRelated?:boolean){
        const tweetQuery = TweetModel.query().findOne({id:id, isActive:true});
        return fetchRelated ? this.fetchRelatedItem(tweetQuery) : tweetQuery;
    }
    public static findAllTweets(fetchRelated?:boolean){
        const tweetsQuery = TweetModel.query().where({
            isActive: true,
        });
        return fetchRelated
        ? this.fetchRelatedList(tweetsQuery)
            : tweetsQuery;
    }
    public static markAsDeleted(id: string) {
        return TweetModel.query().patchAndFetchById(id, { isActive: false });
    }
    public static findAllTweetsFromUser({userID}: {userID: string},fetchRelated?:boolean){
        const tweetsQuery = TweetModel.query().where({
            userID:  userID,
            isActive: true,
        });
        return fetchRelated? this.fetchRelatedList(tweetsQuery) : tweetsQuery;
    }
    private static fetchRelatedList(
        tweetModelQuery: Objection.QueryBuilder<TweetModel, TweetModel[]>,
    ) {
        return tweetModelQuery.withGraphJoined(TweetModel.fetchRelations(), {
            minimize: true,
        });
    }

    private static fetchRelatedItem(
        tweetModelQuery: Objection.QueryBuilder<TweetModel, TweetModel>,
    ) {
        return tweetModelQuery.withGraphJoined(TweetModel.fetchRelations(), {
            minimize: true,
        });
    }
}