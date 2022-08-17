import passportLocalMongoose from 'passport-local-mongoose';
import mongoose from './init';

export interface IUser extends mongoose.PassportLocalDocument {
  username: string,
  password: string,
  walletAddress: string,
  id: string
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  walletAddress: String,
  id: String,
});

userSchema.plugin(passportLocalMongoose, {
  session: false, // Disable sessions as we'll use JWTs
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
