import express from 'express';

import { apiRouter } from '@/components/api';


import {userRouter} from "@/components/user/controller/user.router";
import {tweetRouter} from "@/components/tweet/controller/tweet.router";
import {likeRouter} from "@/components/like/controller/like.router";

const router = express.Router();

// Add routers that do not need authenticated
router.use('', apiRouter);
router.use('/users', userRouter)
router.use('/tweets',tweetRouter);
router.use('/likes',likeRouter);

// Add routers that need authenticated

export { router };
