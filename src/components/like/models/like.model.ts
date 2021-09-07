import {BaseModel} from "@/db";
import {UserModel} from "@/components/user/models/user.model";
import {TweetModel} from "@/components/tweet/models/tweet.model";
import {Model} from "objection";

export class LikeModel extends BaseModel {
    public static tableName = 'likes';

    public tweetID!: string;
    public tweet!: TweetModel;
    public userID!: string;
    public user!: UserModel;
    public isActive!: boolean;

    public static get relationMappings() {
        return {
            tweet: {
                relation: Model.HasOneRelation,
                modelClass: TweetModel,
                join: {
                    from: `${this.tableName}.tweetID`,
                    to: `${TweetModel.tableName}.id`,
                },
            },
            user: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${this.tableName}.userID`,
                    to: `${UserModel.tableName}.id`,
                },
            },
        };
    }

    public static fetchRelations() {
        return {
            tweet: true,
            user: true,
        };
    }
}
