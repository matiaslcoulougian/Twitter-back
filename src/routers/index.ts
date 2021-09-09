import express from 'express';

import { apiRouter } from '@/components/api';


import {userRouter} from "@/components/user/controller/user.router";
import {tweetRouter} from "@/components/tweet/controller/tweet.router";
import {likeRouter} from "@/components/like/controller/like.router";
import {followRouter} from "@/components/follow/controller/follow.router";
import {retweetRouter} from "@/components/retweet/controller/retweet.router";
import {authRouter} from "@/components/auth/controllers/auth.router";
import {logger} from "@/logger";
import {AuthService} from "@/components/auth/services/auth.services";
import {signUpRouter} from "@/components/register/signUp.router";

const router = express.Router();

router.use('', apiRouter);
router.use('/auth', authRouter);
router.use('/register', signUpRouter);

router.use(async (req, res, next) => {
    // I'm passing in the access token in header under key authorization
    const accessTokenFromClient = req.headers.authorization;
    // Fail if token not present in header.
    if (!accessTokenFromClient) {
        logger.info('No auth token found in req headers');
        return res.status(401).send('Access Token missing from header');
    }
    try {
        const token = accessTokenFromClient.split(' ')[1];
        res.locals.user = await AuthService.validateToken({
            jwt: token,
        });
        console.log(res.locals.user)
        return next();
    } catch (e) {
        return res.status(401).send(e.message);
    }
    return next();
});

router.use('/users', userRouter)
router.use('/tweets',tweetRouter);
router.use('/likes',likeRouter);
router.use('/follows', followRouter);
router.use('/retweets', retweetRouter);

export { router };
