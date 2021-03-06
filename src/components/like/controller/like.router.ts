import express from "express";
import {TweetServices} from "@/components/tweet/services/tweet.services";
import {LikeServices} from "@/components/like/services/like.services";

const router= express.Router();
router.get('/',async(_,res)=>{
    try{
        const likes = await LikeServices.findAllLikes(true);
        res.status(200).json({response: likes}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const like = await LikeServices.findLikeById({id:req.params.id},true);
        res.status(200).json({response: like}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/tweet/:tweetId',async(req,res)=>{
    try{
        const likes = await LikeServices.findLikesFromTweet({tweetId:req.params.tweetId},true);
        res.status(200).json({response: likes}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});

router.get('/user/:userId',async(req,res)=>{
    try{
        const likes = await LikeServices.findLikesFromUser({userId : req.params.userId},true);
        res.status(200).json({response: likes}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.post('/',async(req,res)=>{
    try{
        const like = await LikeServices.createLike({ tweetId: req.body.tweetId, userId: res.locals.user.id});
        res.status(200).json({response: like}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        let like = await LikeServices.findLikeById({id: id},false);
        //like.userId == res.locals.user.id
        if(like.userId == res.locals.user.id){
            like = await LikeServices.markAsDeleted(id);
            res.status(200).json({response: like}).send();
        }

    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
export {router as likeRouter}

