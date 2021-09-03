import express from 'express';

import { apiRouter } from '@/components/api';

import { logger } from '@/logger';

const router = express.Router();

// Add routers that do not need authenticated
router.use('', apiRouter);


// Add routers that need authenticated

export { router };
