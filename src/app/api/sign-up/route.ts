import dbConnect from "@/lib/dbconnect"; //import connection db
import { NextResponse } from "next/server";
import UserModel from "@/models/User";
import { success } from "zod/v4";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerification_email";


export async function name(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    //step 1 find user is existed or not and also check verified or not

    const existedUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existedUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: "Username is already Existed",
      });
    }
//check email is exists or not
  const existingUserByEmail = await UserModel.findOne({email})
 //generate verifyCode
 const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  if (existingUserByEmail) {
    true
  }else{
 //then register user and save in db
 const hashedPassword = await bcrypt.hash(password, 10);
 const expiryDate = new Date();
 expiryDate.setDate(expiryDate.getDate() + 1);
//save in db
 const newuser =  new UserModel({
  username,
  email,
 password: hashedPassword,
  verifyCode,
  verifyCodeExpiry: expiryDate,
  isVerified:false,
  isAcceptingMessage: true,
  messages: []
 })

 await newuser.save();
}
await sendVerificationEmail(email,username , verifyCode);

  } catch (error) {
    console.error("Error registering User ", error);
    return Response.json(
      {
        success: false,
        message: "Error registering User",
      },
      {
        status: 500,
      }
    );
  }
}
