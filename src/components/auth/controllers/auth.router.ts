import jwt from "jsonwebtoken";
import {UserValidator} from "@/components/user/validator/user.validator";
import express from "express";
import {AuthService} from "@/components/auth/services/auth.services";

const router = express.Router();

router.post('/login',async(req,res)=>{
    //Authenticate User
    try {
        const userBody = req.body;
        //const validatedBody = UserValidator.validateCreateUserBody(userBody);
        const user = {userName: userBody.userName,password : userBody.password};
        const accessToken = await AuthService.authenticateUser(user);
        res.status(200).json({response: accessToken}).send();
    } catch (e) {
         res.status(400).json({ error: e.message }).send();
    }
});
export{router as authRouter};