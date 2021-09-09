import {TweetServices} from "@/components/tweet/services/tweet.services";

import {TweetModel} from "@/components/tweet/models/tweet.model";
import objectContaining = jasmine.objectContaining;
import {UserService} from "@/components/user/services/user.services";
import {createUserData} from "@/components/user/services/__fixtures__";
import {UserModel} from "@/components/user/models/user.model";
import {ValidationError} from "objection";
import {longTweetText, tweetText} from "@/components/tweet/services/__fixtures__";
//afterEach(() => jest.clearAllMocks());

describe('TweetTest', () => {
    describe('create tweet',  () => {
        it('verifies there are no tweets ', async() => {
            expect(await TweetModel.query()).toHaveLength(0);
        });
        it('creates tweet and stores it', async () => {
            await UserService.createUser(createUserData);
            const resultsUser= await UserModel.query();
            const userId= resultsUser[0].id;
            await TweetServices.createTweet({text:tweetText, userId:userId});
            const results= await TweetModel.query();
            const tweetCreated= results[0];
            expect(tweetCreated).toEqual(objectContaining(
                {
                    id: expect.any(String),
                    text: tweetText,
                    parentTweetId: null,
                    userId: userId,
                }
            ));
        });
        it('throws error when tweet text has more chars than permited', async ()=> {
            await UserService.createUser(createUserData);
            const resultsUser= await UserModel.query();
            const userId= resultsUser[0].id;

          await expect( TweetServices.createTweet({text:longTweetText, userId:userId}),)
               .rejects.toThrow(ValidationError);
            expect(await TweetModel.query()).toHaveLength(0);
        });
        it('throws error when creating tweet with inactive user', async ()=> {
            await UserService.createUser(createUserData);
            const resultsUser= await UserModel.query();
            const userId= resultsUser[0].id;
            await UserService.markAsDeleted(userId)

            await expect( TweetServices.createTweet({text:tweetText, userId:userId}),)
                .rejects.toThrow(Error);
            expect(await TweetModel.query()).toHaveLength(0);
        });
    });
});