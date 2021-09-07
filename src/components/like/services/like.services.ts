import {UserService} from "@/components/user/services/user.services";
import {TweetModel} from "@/components/tweet/models/tweet.model";
import {TweetServices} from "@/components/tweet/services/tweet.services";
import {LikeModel} from "@/components/like/models/like.model";
import Objection from "objection";

export class LikeServices {
    public static async createLike({tweetID, userID}: {
        tweetID: string;
        userID: string;
    }) {
        const user = await UserService.findUserById(userID);
        if (!user) throw new Error('User not found');
        const tweet = await TweetServices.findTweetById({id: tweetID}, false);
        if (!tweet) throw new Error('Tweet not found');

        return LikeModel.query().insert({userID: user.id, tweetID: tweet.id});
    }
    public static findLikeById({id} : {id:string},fetchRelated? : boolean){
        const likeQuery = LikeModel.query().findOne({id:id, isActive:true});
        return fetchRelated ? this.fetchRelatedItem(likeQuery) : likeQuery;
    }
    public static findAllLikes(fetchRelated? : boolean){
        const likesQuery = LikeModel.query().where({isActive:true});
        return fetchRelated ? this.fetchRelatedList(likesQuery) : likesQuery;
    }
    public static findLikesFromTweet({tweetID} : {tweetID:string},fetchRelated? : boolean){
       const likesQuery = LikeModel.query().where({
           isActive: true,
           tweetID : tweetID,
       });
        return fetchRelated ? this.fetchRelatedList(likesQuery) : likesQuery;
    }
    public static findLikesFromUser({userID} : {userID:string},fetchRelated? : boolean){
        const likesQuery = LikeModel.query().where({
            isActive: true,
            userID : userID,
        });
        return fetchRelated ? this.fetchRelatedList(likesQuery) : likesQuery;
    }
    public static markAsDeleted(id:string){
        return LikeModel.query().patchAndFetchById(id, { isActive: false });
    }
    private static fetchRelatedList(
        likeModelQuery: Objection.QueryBuilder<LikeModel, LikeModel[]>,
    ) {
        return likeModelQuery.withGraphJoined(LikeModel.fetchRelations(), {
            minimize: true,
        });
    }
    private static fetchRelatedItem(
        likeModelQuery: Objection.QueryBuilder<LikeModel, LikeModel>,
    ) {
        return likeModelQuery.withGraphJoined(LikeModel.fetchRelations(), {
            minimize: true,
        });
    }
}