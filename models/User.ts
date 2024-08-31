import mongoose, { Document } from 'mongoose';
const { Schema } = mongoose;

export interface IUser extends Document {
  user_id: string;
  name: string;
  email: string;
  password: string;
  date: Date;
}

const UserSchema = new Schema<IUser>({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model<IUser>('user', UserSchema);
export default User;