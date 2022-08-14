import passport from 'passport';
import PassportJwt from 'passport-jwt';
import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { UserModel } from '../models/users';

require('dotenv').config();

// These should be in .env
// secret (generated using `openssl rand -base64 48` from console)
const { JWT_SECRET } = process.env;
const opts: PassportJwt.StrategyOptions = {
  // Where will the JWT be passed in the HTTP request?
  // e.g. Authorization: Bearer xxxxxxxxxx
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // What is the secret
  secretOrKey: JWT_SECRET,
  // What algorithm(s) were used to sign it?
  algorithms: ['HS256'],
};

passport.use(UserModel.createStrategy());

export function signUp(req: Request, res: any, next: Function) {
  const user = new UserModel({
    username: req.body.username,
    password: req.body.password,
    walletAddress: req.body.wallet_address,
  });
  // Create the user with the specified password
  UserModel.register(user, req.body.password, (err) => {
    if (err) {
      // Our signup middleware failed
      next(err);
      return;
    }
    // Store user so we can access it in our handler
    req.user = user; // これ要らないかも
    // Success!
    next();
  });
}

passport.use(
  new PassportJwt.Strategy(
    opts,
    (payload, done) => {
      // Find the real user from our database using the `id` in the JWT
      UserModel.findById(payload.sub)
        .then((user) => {
          // If user was found with this id
          if (user) {
            done(null, user);
          } else {
            // If not user was found
            done(null, false);
          }
        })
        .catch((err) => {
          // If there was failure
          done(err, false);
        });
    },
  ),
);

export function signJWTForUser(req: Request, res:any) {
  // Create a signed token
  const { user } = req;
  const token = JWT.sign(
    {
      user,
    },
    JWT_SECRET!,
    {
      algorithm: 'HS256',
      expiresIn: '7 days',
    },
  );
  // Send the token
  res.json({ token });
}

export function initialize() {
  passport.initialize();
}

export function signIn() {
  passport.authenticate('local', { session: false });
}

export function requireJWT() {
  passport.authenticate('jwt', { session: false });
}
