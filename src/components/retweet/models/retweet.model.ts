import {BaseModel} from "@/db";
import {UserModel} from "@/components/user/models/user.model";
import {TweetModel} from "@/components/tweet/models/tweet.model";
import {Model} from "objection";

export class RetweetModel extends BaseModel{
    public static tableName= 'retweets';

    public userRetweeterId!: string;
    public userRetweeter!: UserModel;

    public tweetId!: string;
    public tweet!: TweetModel;

    public isActive!:boolean;

    public static get relationMappings(){
        return{
            userRetweeter: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${this.tableName}.userRetweeterId`,
                    to: `${UserModel.tableName}.id`,
                },
            },
            tweet: {
                relation: Model.HasOneRelation,
                modelClass: TweetModel,
                join: {
                    from: `${this.tableName}.tweetId`,
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