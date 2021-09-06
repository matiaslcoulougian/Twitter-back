import express from 'express';


import {logger} from "@/logger";
import {UserService} from "@/components/user/services/user.services";
import {UserValidator} from "@/components/user/validator/user.validator";

const router = express.Router();
router.get('/',async(_,res)=>{
    try{
        const users = await UserService.findAllUsers();
        res.status(200).json({response: users}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.get('/:userName',async(req,res)=>{
    try{
        const users = await UserService.findUserByUserName(req.params.userName);
        res.status(200).json({response: users}).send();
    }
    catch(e){
        res.status(400).json({error: e.message}).send();
    }
});
router.put('/:userName',async(req,res)=>{
    try{
        const {userName} = req.params;
        const validateBody = UserValidator.validateUpdateUserBody(req.body);
        const user = await UserService.updateUser(validateBody,{userName});
        res.status(200).json({ response: user }).send();
        }
        catch(e){
            res.status(404).json({error: e.message}).send();
        }
});
router.post('/register', async (req, res) => {
    try {
        const userBody = req.body;
        const validatedBody = UserValidator.validateCreateUserBody(userBody);
        const user = await UserService.createUser(validatedBody);
        res.status(201).json({ response: user }).send();
    } catch (e) {
        res.status(400).json({ error: e.message }).send();
    }
});
export { router as userRouter };
//router.delete

router.delete('/:userName', async (req, res) => {
    try{
        const {userName} = req.params;
        let user = await UserService.findUserByUserName(userName);
        user = await UserService.markAsDeleted(user.id);
        res.status(200).json({ response: user }).send();
    }
    catch(e){
        res.status(404).json({error: e.message}).send();
    }
});