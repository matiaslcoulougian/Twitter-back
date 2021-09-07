
import {TweetServices} from "@/components/tweet/services/tweet.services";
import {TweetValidator} from "@/components/tweet/validator/tweet.validator";
import {UserService} from "@/components/user/services/user.services";
import express from "express";
import {logger} from "@/logger";

const router= express.Router();
router.get('/',async(_,res)=>{
    try{
        const tweets = await TweetServices.findAllTweets(true);
        res.status(200).json({response: tweets}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/user/:userId',async(req,res)=>{
    try{
        const userId= req.params.userId;
        const tweets = await TweetServices.findAllTweetsFromUser({ userId: userId }, true);
        res.status(200).json({response: tweets}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        const tweet = await TweetServices.findTweetById({ id: id }, true);
        res.status(200).json({response: tweet}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/:id/responses',async(req,res)=>{
    try{
        const id= req.params.id;
        const tweets = await TweetServices.findResponsesFromTweet({ id: id }, true);
        res.status(200).json({response: tweets}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.post('/', async (req, res) => {
    try {
        const tweetBody = req.body;
        const validatedBody = TweetValidator.validateCreateTweetBody(tweetBody);
        const tweet = await TweetServices.createTweet(validatedBody);
        res.status(201).json({ response: tweet }).send();
    } catch (e) {
        res.status(400).json({ error: e.message }).send();
    }
});
router.delete('/:tweetId', async (req, res) => {
    try{
        let tweet = await TweetServices.findTweetById({id: req.params.tweetId},true);
        tweet = await TweetServices.markAsDeleted(tweet.id);
        res.status(200).json({ response: tweet }).send();
    }
    catch(e){
        res.status(404).json({error: e.message}).send();
    }
});
export { router as tweetRouter };