import {UserService} from "@/components/user/services/user.services";
import {TweetServices} from "@/components/tweet/services/tweet.services";
import {RetweetModel} from "@/components/retweet/models/retweet.model";
import Objection from "objection";

export class RetweetServices{
    public static async createRetweet({userRetweeterId, tweetId}: {
        userRetweeterId: string;
        tweetId: string;
    }) {
        const user = await UserService.findUserById(userRetweeterId);
        if (!user){
            throw new Error('User not found');
        }
        const tweet = await TweetServices.findTweetById({id: tweetId}, false);

        if (!tweet){

            throw new Error('Tweet not found');
        }

        return RetweetModel.query().insert({userRetweeterId: user.id, tweetId: tweet.id});
    }
    public static findRetweetById({id} : {id:string},fetchRelated? : boolean){
        const retweetQuery = RetweetModel.query().findOne({'retweets.id':id, 'retweets.isActive':true});
        return fetchRelated ? this.fetchRelatedItem(retweetQuery) : retweetQuery;
    }
    public static findAllRetweets(fetchRelated?:true){
        const retweetsQuery = RetweetModel.query().where({'retweets.isActive':true});
        return fetchRelated ? this.fetchRelatedList(retweetsQuery) : retweetsQuery;
    }
    public static findRetweetsFromTweet({tweetId} : {tweetId:string},fetchRelated? : boolean){
        const retweetsQuery = RetweetModel.query().where({
            'retweets.isActive': true,
            tweetId : tweetId,
        });
        return fetchRelated ? this.fetchRelatedList(retweetsQuery) : retweetsQuery;
    }
    public static findRetweetsFromUser({userRetweeterId} : {userRetweeterId:string},fetchRelated? : boolean){
        const retweetsQuery = RetweetModel.query().where({
            'retweets.isActive': true,
            userRetweeterId : userRetweeterId,
        });
        return fetchRelated ? this.fetchRelatedList(retweetsQuery) : retweetsQuery;
    }
    public static markAsDeleted(id:string){
        return RetweetModel.query().patchAndFetchById(id, { isActive: false });
    }

    private static fetchRelatedList(
        retweetModelQuery: Objection.QueryBuilder<RetweetModel, RetweetModel[]>,
    ) {
        return retweetModelQuery.withGraphJoined(RetweetModel.fetchRelations(), {
            minimize: true,
        });
    }
    private static fetchRelatedItem(
        retweetModelQuery: Objection.QueryBuilder<RetweetModel, RetweetModel>,
    ) {
        return retweetModelQuery.withGraphJoined(RetweetModel.fetchRelations(), {
            minimize: true,
        });
    }
}