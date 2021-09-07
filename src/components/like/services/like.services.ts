import {UserService} from "@/components/user/services/user.services";
import {TweetModel} from "@/components/tweet/models/tweet.model";
import {TweetServices} from "@/components/tweet/services/tweet.services";
import {LikeModel} from "@/components/like/models/like.model";
import Objection from "objection";

export class LikeServices {
    public static async createLike({tweetId, userId}: {
        tweetId: string;
        userId: string;
    }) {
        const user = await UserService.findUserById(userId);
        if (!user) throw new Error('User not found');
        const tweet = await TweetServices.findTweetById({id: tweetId}, false);
        if (!tweet) throw new Error('Tweet not found');

        return LikeModel.query().insert({userId: user.id, tweetId: tweet.id});
    }
    public static findLikeById({id} : {id:string},fetchRelated? : boolean){
        const likeQuery = LikeModel.query().findOne({'likes.id':id, 'likes.isActive':true});
        return fetchRelated ? this.fetchRelatedItem(likeQuery) : likeQuery;
    }
    public static findAllLikes(fetchRelated? : boolean){
        const likesQuery = LikeModel.query().where({'likes.isActive':true});
        return fetchRelated ? this.fetchRelatedList(likesQuery) : likesQuery;
    }
    public static findLikesFromTweet({tweetId} : {tweetId:string},fetchRelated? : boolean){
       const likesQuery = LikeModel.query().where({
           tweetId : tweetId,
           'likes.isActive': true,
       });
        return fetchRelated ? this.fetchRelatedList(likesQuery) : likesQuery;
    }
    public static findLikesFromUser({userId} : {userId:string},fetchRelated? : boolean){
        const likesQuery = LikeModel.query().where({
            'likes.isActive': true,
            userId : userId,
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