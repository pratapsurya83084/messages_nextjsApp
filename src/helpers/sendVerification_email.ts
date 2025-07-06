import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/Apiresponse";

export async function sendVerificationEmail( email: string,username: string,verifyCode: string): Promise<ApiResponse> {
  try {
   console.log("verification code is : ",verifyCode  +" "+username +" "+email);

   const response =  await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry message Verification code : ",
      react: VerificationEmail({ username, otp: verifyCode }), //call components
    });

console.log("email response : ",response);

    
    return { success: true, message: "failed sending verification email" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "failed sending verification email" };
  }
}

// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/Apiresponse";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
//   try {
//     console.log("Sending verification code:", verifyCode, "to:", email);

//     const response = await resend.emails.send({
//       from: "mystry@message.com", // ✅ Must be a verified sender domain
//       to: email,
//       subject: `Mystry Message Verification Code`,
//       react: VerificationEmail({ username, otp: verifyCode }),
//     });
// console.log(response.error)
//     // You can optionally check `response.id` or similar here

//     return { success: true, message: "Verification email sent successfully" };
//   } catch (error) {
//     console.error("❌ Error sending verification email:", error);
//     return { success: false, message: "Failed to send verification email" };
//   }
// }
