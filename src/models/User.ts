import mongoose, { Document, Schema } from "mongoose";
import { string } from "zod/v4";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified:boolean,
  isAcceptingMessage: boolean;
  messages: Message[];
}

export const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password:{
    type: String,
    required: [true, "password is required"],
    trim: true,

  },
  
  verifyCode:{
    type: String,
    required: [true, "verifyCode is required"],
   
  },
  verifyCodeExpiry:{
    type: Date,
    required: [true, "verifyCodeExpiry is required"],
  },
     isVerified:{
    type:Boolean,
    default:false,
  },
  isAcceptingMessage:{
    type:Boolean,
    default:true
  },
  messages: [MessageSchema],
});



const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;