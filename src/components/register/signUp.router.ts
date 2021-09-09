import {UserValidator} from "@/components/user/validator/user.validator";
import {UserService} from "@/components/user/services/user.services";
import express from "express";


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const userBody = req.body;
        const validatedBody = UserValidator.validateCreateUserBody(userBody);
        const user = await UserService.createUser(validatedBody);
        res.status(201).json({ response: user }).send();
    } catch (e) {
        res.status(400).json({ error: e.message }).send();
    }
});
export{router as signUpRouter};