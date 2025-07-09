import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { Message } from "@/models/User";


export async function POST(request: Request) {
  await dbConnect();

  //accept username and content of message
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(  { success: false, message: "User not found" },{ status: 404 });
    }

//check is user accepting messages or not
const userMessage = user.isAcceptingMessage;
console.log(userMessage)
if (!userMessage) {
    return Response.json({
         success: false,
          message: "User is not accepting the messages" 
        },
        { status: 403 }
    );
}

const newMessage = {content , createdAt:new Date()}

 user.messages.push(newMessage as Message);
 
user.save();

return Response.json({
    success: true,
    message: "Message sent successfully",
},{status:200});



  } catch (error) {
    console.log("Unexpected error occured :",error);
return Response.json(
      {
        success: false,
        messsage: "Error to sending message",
      },
      { status: 500 }
    );
  }
}
