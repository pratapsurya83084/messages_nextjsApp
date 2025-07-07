"use client";

import React, { useCallback, useEffect } from "react";
import { Message } from "@/models/User";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcceptMessage } from "@/schemas/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "@/types/Apiresponse";
import { User } from "next-auth";

const page = () => {
  const [message, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchingLoading, setIsSwitchingLoading] = useState(false);

const handleDeleteMessage = (messageId: string) => {
  setMessage(message.filter((msg) => msg._id !== messageId));
};



  const { data: session } = useSession();
  
  const form = useForm({
    resolver: zodResolver(AcceptMessage),
  });

  const { register, watch, setValue } = form;

const  acceptMessages = watch('acceptMessage')

const fetchAcceptsMessage = useCallback(async()=>{
setIsSwitchingLoading(true);

try {
  
 const response =  await axios.get('/api/accept-messages')
    setValue('acceptMessage',response.data.isAcceptingMessage)

  } catch (error) {
  
    const axiosError = error as AxiosError<ApiResponse>
  toast("success",{
    description:axiosError.response?.data.message||"failed to fetch message settings",
  })
}finally{
  setIsSwitchingLoading(false)
}

},[])

// fetchAcceptsMessage();







const fetchMessages = useCallback(async (refresh: boolean = false) => {
  setIsLoading(true);
  setIsSwitchingLoading(false);

  try {
    const response = await axios.get<ApiResponse>('/api/get-messages');

    // Assuming you want to do something with the data:
    // setMessages(response.data.messages); 

    setIsLoading(false);
if (refresh) {
  toast("success",{
    description: "showing latest messages ",
  })
}
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    toast("error", {
      description: axiosError.response?.data.message || "Failed to fetch message settings",
    });

    setIsLoading(false);
    setIsSwitchingLoading(false);
  }finally{
    setIsLoading(false)
    setIsSwitchingLoading(false)
  }
}, [setIsLoading,setMessage]);



useEffect(()=>{
if (!session ||!session.user) return
fetchAcceptsMessage()
fetchMessages()
},[session,setValue,fetchAcceptsMessage,fetchMessages])



//handelSwitch change
const handelSwitchChange =async()=>{
// if(!isSwitchingLoading){  //not true then 
// setIsSwitchingLoading(true)
// }

 

try {
  const response = await axios.post<ApiResponse>('api/accept-messages',{
    acceptMessages:!acceptMessages
  })
  setValue("acceptMessage",!acceptMessages)
  toast("success",{
    description:response.data.message
  })




} catch (error) {
   const axiosError = error as AxiosError<ApiResponse>;
    toast("error", {
      description: axiosError.response?.data.message || "Failed to fetch message settings",
    });

  }
}

//return user url and copy button 

const {username} = session?.user as User

const baseUrl = `${window.location.protocol}//${window.location.host}`;
console.log(baseUrl);

const profiUrl = `${baseUrl}/u/${username}`


const copyToClipboard = () =>{
navigator.clipboard.writeText(profiUrl);
toast("success",{
description:"Profile Url has beem copied to Clipboard"
})
}




if (!session || !session.user) {
  return <div>Please login </div>
}



  return <div>Dashboard</div>;
};

export default page;
