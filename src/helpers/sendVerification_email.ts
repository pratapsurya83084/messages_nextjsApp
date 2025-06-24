import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/Apiresponse";

export async function sendVerificationEmail( email: string,username: string,verifyCode: string): Promise<ApiResponse> {
  try {
   
    await resend.emails.send({
      from: "you@example.com",
      to: email,
      subject: "Mystry message Verification code : ",
      react: VerificationEmail({ username, otp: verifyCode }), //call components
    });


    
    return { success: true, message: "failed sending verification email" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "failed sending verification email" };
  }
}
