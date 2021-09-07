import express from "express";
import {RetweetServices} from "@/components/retweet/services/retweet.services";

const router= express.Router();
router.get('/',async(_,res)=>{
    try{
        const retweets = await RetweetServices.findAllRetweets(true);
        res.status(200).json({response: retweets}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const retweet = await RetweetServices.findRetweetById({id:req.params.id},true);
        res.status(200).json({response: retweet}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/tweet/:tweetID',async(req,res)=>{
    try{
        const retweets = await RetweetServices.findRetweetsFromTweet({tweetID:req.params.tweetID},true);
        res.status(200).json({response: retweets}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});

router.get('/user/:userRetweeterID',async(req,res)=>{
    try{
        const retweets = await RetweetServices.findRetweetsFromUser({userRetweeterID : req.params.userRetweeterID},false);
        res.status(200).json({response: retweets}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.post('/',async(req,res)=>{
    try{
        const retweet = await RetweetServices.createRetweet(req.body);
        res.status(200).json({response: retweet}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        let retweet = await RetweetServices.findRetweetById({id: id},false);
        retweet = await RetweetServices.markAsDeleted(id);
        res.status(200).json({response: retweet}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
export {router as retweetRouter}