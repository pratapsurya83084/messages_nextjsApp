import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/User";

export async function DELETE(request: NextRequest,{ params }: { params: { messageId: string }}) {
  const { messageId } = params;

  try {
    await dbConnect();

    // Find the user who has this message and pull it out
    const updatedUser = await UserModel.findOneAndUpdate(
      { "messages._id": messageId },
      { $pull: { messages: { _id: messageId } } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Message not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Message with ID ${messageId} deleted successfully.`,
    });


    
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
