import { Resend } from "resend";
console.log('API KEY from env:', process.env.RESEND_API_KEY); // TEMP



export const resend = new Resend(process.env.RESEND_API_KEY);