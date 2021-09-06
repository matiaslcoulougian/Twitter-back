import {BaseModel} from "@/db";
import {tweetSchema} from "@/components/tweet/models/schema/tweet.schema";

export class TweetModel extends BaseModel{
    public static tableName = 'tweets';

    public text! : string;
    public userID!: string;  //Dependency from User
    public parentTweetID?: string; //Dependency from Tweet
    public isActive!: boolean;
    public static get jsonSchema(){
        return tweetSchema;
    }

}