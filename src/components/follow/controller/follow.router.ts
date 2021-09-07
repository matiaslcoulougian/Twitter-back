import express from 'express';
import {FollowService} from "@/components/follow/services/follow.service";
import {FollowerValidator} from "@/components/follow/validator/follow.validator";





const router = express.Router();

router.get('/',async(_,res)=>{
    try{
        const users = await FollowService.findAllFollows();
        res.status(200).json({response: users}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});

router.get('/followers/:followedUserID', async(req,res)=> {
    try {
        const followedUserID = req.params.followedUserID;
        const followers = await FollowService.findUserFollowers({followedUserID: followedUserID}, false);
        res.status(200).json({response: followers}).send();
    } catch (e) {
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/followed/:followerUserID', async(req,res)=> {
    try {
        const followerUserID = req.params.followerUserID;
        const follows = await FollowService.findUserFollows({followerUserID: followerUserID}, false);
        res.status(200).json({response: follows}).send();
    } catch (e) {
        res.status(400).json({error: e.message}).send();
    }
});
router.post('/', async (req, res) => {
    try {
        const followBody = req.body;
        const validatedBody = FollowerValidator.validateCreateFollowerBody(followBody);
        const follow = await FollowService.createFollow(validatedBody);
        res.status(201).json({ response: follow }).send();
    } catch (e) {
        res.status(400).json({ error: e.message }).send();
    }
});
router.delete('/:followID',async (req, res) => {
    try{
        let follow = await FollowService.findFollowByID({id: req.params.followID},false);
        follow = await FollowService.markAsDeleted(follow.id);
        res.status(200).json({ response: follow }).send();
    }
    catch(e){
        res.status(404).json({error: e.message}).send();
    }
});
export {router as followRouter};