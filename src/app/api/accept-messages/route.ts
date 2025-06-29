import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options"; //user added in session so also we get this user


export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        messsage: "User is not Authenticated",
      },
      { status: 401 }
    );
  }
  //find user if session is exists
  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          messsage: "failed to update user status to accepting messages",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        messsage: " accepting messages status updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update user status to accepting message");
    return Response.json(
      {
        success: false,
        messsage: "failed to update user status to accepting messages",
      },
      { status: 500 }
    );
  }
}

//get request

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        messsage: "User is not Authenticated",
      },
      { status: 401 }
    );
  }
 try {
     //find user if session is exists
     const userId = user._id;
     const foundUser = await UserModel.findById(userId);
     if (!foundUser) {
       return Response.json(
         {
           success: false,
           messsage: "User not found",
         },
         { status: 404 }
       );
     }
     return Response.json(
       {
         success: true,
         isAcceptingMessages: foundUser.isAcceptingMessage,
       },
       { status: 200 }
     );
 } catch (error) {
     console.log("failed to update user status to accepting message");
    return Response.json(
      {
        success: false,
        messsage: "Error is getting message acceptanse status",
      },
      { status: 500 }
    );
 }
}
