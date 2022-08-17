import express from 'express';

const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Sign up
router.post(
  '/auth/signup',
  // middleware that handles the registration process
  authMiddleware.signUp,
  // json handler
  authMiddleware.signJwtForUser,
);

// Sign in
router.post(
  '/auth/signin',
  // middleware that handles the sign in process
  authMiddleware.signIn,
  // json handler
  authMiddleware.signJwtForUser,
);

export default router;
