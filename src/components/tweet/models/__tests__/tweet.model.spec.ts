import {TweetModel} from "@/components/tweet/models/tweet.model";
import {emptyTweetData, validTweetData, invalidText} from "@/components/tweet/models/__fixtures__";

describe('TweetModel', () => {
    describe('schema validation', ()=> {
        it('validates required fields', ()=> {
            expect(() => {
                TweetModel.fromJson(validTweetData);

            }).not.toThrow();
            expect(() => {
                TweetModel.fromJson(emptyTweetData);

            }).toThrow();
            expect(() => {
                TweetModel.fromJson(invalidText);

            }).toThrow();
        })
    })
})