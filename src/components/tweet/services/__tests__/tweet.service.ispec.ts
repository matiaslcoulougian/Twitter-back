import {TweetServices} from "@/components/tweet/services/tweet.services";
import{
    createTweetData,
    createTweetWithInvalidLongText,
} from '../__fixtures__';
import {TweetModel} from "@/components/tweet/models/tweet.model";
import objectContaining = jasmine.objectContaining;
import {UserService} from "@/components/user/services/user.services";
import {createUserData} from "@/components/user/services/__fixtures__";
import {UserModel} from "@/components/user/models/user.model";
import {ValidationError} from "objection";
//afterEach(() => jest.clearAllMocks());

describe('TweetTest', () => {
    describe('create tweet',  () => {
        it('verifies there are no tweets ', async() => {
            expect(await TweetModel.query()).toHaveLength(0);
        });
        it('create tweet properly', async () => {
            await UserService.createUser(createUserData);
            const resultsUser= await UserModel.query();
            const userId= resultsUser[0].id;
            await TweetServices.createTweet({text:createTweetData.text, userId:userId});
            const results= await TweetModel.query();
            const tweetCreated= results[0];
            expect(tweetCreated).toEqual(objectContaining(
                {
                    id: expect.any(String),
                    text: createTweetData.text,
                    parentTweetId: null,
                    userId: userId,
                }
            ));
        });
        it('create inproperly Tweet', async ()=> {
            await UserService.createUser(createUserData);
            const resultsUser= await UserModel.query();
            const userId= resultsUser[0].id;

          await expect( TweetServices.createTweet({text:createTweetWithInvalidLongText.text, userId:userId}),)
               .rejects.toThrow(ValidationError);
            expect(await TweetModel.query()).toHaveLength(0);
        });
    });
});