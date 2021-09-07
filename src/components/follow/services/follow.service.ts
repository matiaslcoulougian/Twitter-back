
import {UserService} from "@/components/user/services/user.services";
import Objection from "objection";
import {FollowModel} from "@/components/follow/models/follow.model";
import {TweetModel} from "@/components/tweet/models/tweet.model";

export class FollowService{
    public static async createFollow({followedUserID, followerUserID}: {
        followedUserID: string;
        followerUserID: string;
    }) {
        const followedUser = await UserService.findUserById(followedUserID);
        if(!followedUser) throw new Error('Followed user not found');
        const followerUser = await UserService.findUserById(followerUserID);
        if(!followerUser) throw new Error('Follower user not found');
        return FollowModel.query().insert({followerUserID: followerUser.id,followedUserID: followedUser.id})
    }
    public static findAllFollows(fetchRelated?:boolean){
        const followModelQuery = FollowModel.query().where({isActive:true,});
        return fetchRelated ? this.fetchRelatedList(followModelQuery) : followModelQuery;
    }

    public static findUserFollowers({followedUserID}:{followedUserID:string},fetchRelated?:boolean){
        const followersQuery = FollowModel.query().where({
            followedUserID: followedUserID,
            'follows.isActive': true,
        });
        return fetchRelated ? this.fetchRelatedList(followersQuery) : followersQuery;
    }

    public static findUserFollows({followerUserID}:{followerUserID:string},fetchRelated?:boolean){
        const followedsQuery = FollowModel.query().where({
            followerUserID: followerUserID,
            isActive: true,
        });
        return fetchRelated ? this.fetchRelatedList(followedsQuery) : followedsQuery;
    }
    public static findFollowByID({id}: {id:string},fetchRelated?:boolean){
         const followQuery = FollowModel.query().findOne({
             id: id,
             isActive: true,
         });
        return fetchRelated
            ? this.fetchRelatedItem(followQuery)
            : followQuery;
    }

    private static fetchRelatedList(
        followModelQuery: Objection.QueryBuilder<FollowModel, FollowModel[]>,
    ) {
        return followModelQuery.withGraphJoined(FollowModel.fetchRelations(), {
            minimize: true,
        });
    }

    private static fetchRelatedItem(
        followModelQuery: Objection.QueryBuilder<FollowModel, FollowModel>,
    ) {
        return followModelQuery.withGraphJoined(FollowModel.fetchRelations(), {
            minimize: true,
        });
    }
    public static markAsDeleted(id: string) {
        return FollowModel.query().patchAndFetchById(id, { isActive: false });
    }
}