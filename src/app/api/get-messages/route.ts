import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options"; //user added in session so also we get this user
import mongoose from "mongoose";



export async function GET(request:Request){

await dbConnect();

 const session = await getServerSession(authOptions);
 
 const user = session?.user as User  
 const username = user?.username
 // console.log("username is : " ,user?.username);
console.log(username)
  if (!session || !username) {
    return Response.json(
      {
        success: false,
        messsage: "User is not Authenticated",
       user: username
      },
      { status: 401 }
    );
  }
  //find user if session is exists
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    
const user = await UserModel.aggregate([
    {$match:{id:userId}},
    {$unwind:'$messages'},
    {$sort:{'message.createdAt':-1}},
    {$group:{_id:'$_id',messages:{$push:'$messages'}}}
])

if (!user||user.length===0) {
     return Response.json(
      {
        success: false,
        messsage: "User is not found",
      },
      { status: 401 }
    );
}


 return Response.json(
      {
        success: true,
        messsage: user[0].messages
      },
      { status: 200 }
    );



  } catch (error) {
     return Response.json(
      {
        success: false,
        messsage: "User is not Authenticated",
      },
      { status: 401 }
    );
  }

}