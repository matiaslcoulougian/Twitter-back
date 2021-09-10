import {BaseModel} from "@/db";
import {tweetSchema} from "@/components/tweet/models/schema/tweet.schema";
import {UserModel} from "@/components/user/models/user.model";
import {Model} from "objection";

export class TweetModel extends BaseModel{
    public static tableName = 'tweets';

    public text! : string;
    public isActive!: boolean;

    public userId!: string;
    public user!: UserModel;

    public parentTweetId?: string;
    public parentTweet?: TweetModel;

    public static get jsonSchema(){
        return tweetSchema;
    }
    public static get relationMappings() {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${this.tableName}.userId`,
                    to: `${UserModel.tableName}.id`,
                },
            },
            parentTweet:{
                relation: Model.HasOneRelation,
                modelClass: TweetModel,
                join: {
                    from: `${this.tableName}.parentTweetId`,
                    to: `${TweetModel.tableName}.id`,
                },
            },
        };
    }
    public static fetchRelations() {
        return {
            user: true,
            parentTweet: true,
        };
    }

}