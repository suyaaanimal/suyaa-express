const authMiddleware = require('../middleware/auth');

// Sign up
router.post(
  '/auth/signup',
  // middleware that handles the registration process
  authMiddleware.signUp,
  // json handler
  authMiddleware.signJWTForUser,
);

// Sign in
router.post(
  '/auth/signin',
  // middleware that handles the sign in process
  authMiddleware.signIn,
  // json handler
  authMiddleware.signJWTForUser,
);

exports.default = router;
