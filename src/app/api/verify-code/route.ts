import dbConnect from "@/lib/dbconnect";
import { z } from "zod";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { userValidation } from "@/schemas/signupSchema";

//compare verifyCode in db with user entered code

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodeUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Username invalid or user not found",
        },
        { status: 500 }
      );
    }

    const isCodValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    //both  conditions are true then user isVerify = true
    if (isCodValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
       return Response.json(
        {
          success: true,
          message: "account verified success",
        },
        { status: 200 }
      );
    }else if(!isCodeNotExpired){
        return Response.json(
        {
          success: false,
          message: "verification code has expired, please signup again",
        },
        { status: 400 }
      );  
    }else{
         return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        { status: 400 }
      );  
    }

  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
