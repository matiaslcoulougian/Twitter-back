import {BaseModel} from "@/db";
import {UserModel} from "@/components/user/models/user.model";
import {TweetModel} from "@/components/tweet/models/tweet.model";
import {Model} from "objection";

export class RetweetModel extends BaseModel{
    public static tableName= 'retweets';

    public userRetweeterID!: string;
    public userRetweeter!: UserModel;

    public tweetID!: string;
    public tweet!: TweetModel;

    public isActive!:boolean;

    public static get relationMappings(){
        return{
            userRetweeter: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${this.tableName}.userRetweeterID`,
                    to: `${UserModel.tableName}.id`,
                },
            },
            tweet: {
                relation: Model.HasOneRelation,
                modelClass: TweetModel,
                join: {
                    from: `${this.tableName}.tweetID`,
                    to: `${TweetModel.tableName}.id`,
                },
            },
        };
    }
    public static fetchRelations(){
        return{
            userRetweeter: true,
            tweet: true,
        };
    }
}