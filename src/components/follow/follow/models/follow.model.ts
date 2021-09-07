import {BaseModel} from "@/db";
import {userSchema} from "@/components/user/models/schema/user.schema";
import {UserModel} from "@/components/user/models/user.model";
import {Model} from "objection";

export class FollowModel extends BaseModel {
    public static tableName = 'follows';

    public followerUserID!: string;
    public followerUser!: UserModel;

    public followedUserID!: string;
    public followedUser!: UserModel;

    public isActive! : boolean;

    public static get relationMappings(){
        return {
            followerUser: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${this.tableName}.followerUserID`,
                    to: `${UserModel.tableName}.id`,
                },
            },
            followedUser : {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${this.tableName}.followedUserID`,
                    to: `${UserModel.tableName}.id`,
                },
            },
        };
    }
    public static fetchRelations(){
        return{
            followerUser: true,
            followedUser: true,
        };
    }
}



