import {TweetModel} from "@/components/tweet/models/tweet.model";
import {UserService} from "@/components/user/services/user.services";
import Objection from "objection";

export class TweetServices{
    public static async createTweet({
        text, userId, parentTweetId
                              }: {
        text: string;
        userId: string;
        parentTweetId?: string;
    }){
        const user = await UserService.findUserById(userId);
        if(!user) throw new Error('User not found');
        //const parentTweet = await TweetServices.findTweetById(parentTweetId);
        return TweetModel.query().insert({text, userId: user.id, parentTweetId});
    }
    public static findTweetById({id}: {id : string},fetchRelated?:boolean){
        const tweetQuery = TweetModel.query().findOne({'tweets.id':id, 'tweets.isActive':true});
        return fetchRelated ? this.fetchRelatedItem(tweetQuery) : tweetQuery;
    }
    public static findAllTweets(fetchRelated?:boolean){
        const tweetsQuery = TweetModel.query().where({
            'tweets.isActive': true,
        });
        return fetchRelated
        ? this.fetchRelatedList(tweetsQuery)
            : tweetsQuery;
    }
    public static markAsDeleted(id: string) {
        return TweetModel.query().patchAndFetchById(id, { isActive: false });
    }
    public static findAllTweetsFromUser({userId}: {userId: string},fetchRelated?:boolean){
        const tweetsQuery = TweetModel.query().where({
            'tweets.userId':  userId,
            'tweets.isActive': true,
        });
        return fetchRelated? this.fetchRelatedList(tweetsQuery) : tweetsQuery;
    }
    public static findResponsesFromTweet({id}: {id: string},fetchRelated?:boolean){
        const tweetsQuery = TweetModel.query().where({
            parentTweetId:  id,
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