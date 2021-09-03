import express from 'express';

import { apiRouter } from '@/components/api';

import { logger } from '@/logger';
import {userRouter} from "@/components/user/controller/user.router";

const router = express.Router();

// Add routers that do not need authenticated
router.use('', apiRouter);
router.use('/users', userRouter)

// Add routers that need authenticated

export { router };
