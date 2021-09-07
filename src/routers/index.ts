import express from 'express';

import { apiRouter } from '@/components/api';


import {userRouter} from "@/components/user/controller/user.router";
import {tweetRouter} from "@/components/tweet/controller/tweet.router";
import {likeRouter} from "@/components/like/controller/like.router";
import {followRouter} from "@/components/follow/controller/follow.router";
import {retweetRouter} from "@/components/retweet/controller/retweet.router";

const router = express.Router();

// Add routers that do not need authenticated
router.use('', apiRouter);
router.use('/users', userRouter)
router.use('/tweets',tweetRouter);
router.use('/likes',likeRouter);
router.use('/follows', followRouter);
router.use('/retweets', retweetRouter);


// Add routers that need authenticated

export { router };
