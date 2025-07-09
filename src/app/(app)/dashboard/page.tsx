// "use client";

// import React, { useCallback, useEffect } from "react";
// import { Message } from "@/models/User";
// import { useState } from "react";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AcceptMessage } from "@/schemas/acceptMessageSchema";
// import axios, { AxiosError } from "axios";
// import { ApiError } from "next/dist/server/api-utils";
// import { ApiResponse } from "@/types/Apiresponse";
// import { User } from "next-auth";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { Loader2, RefreshCcw } from "lucide-react";
// import MessageCard from '@/components/MessageCard'

// const page = () => {
//   const [message, setMessage] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchingLoading, setIsSwitchingLoading] = useState(false);


// console.log('message fetching :',message);


// const handleDeleteMessage = (messageId: string) => {
//   setMessage(message.filter((msg) => msg._id !== messageId));
// };



//   const { data: session } = useSession();
  
//   const form = useForm({
//     resolver: zodResolver(AcceptMessage),
//   });

//   const { register, watch, setValue } = form;

// const  acceptMessages = watch('acceptMessage')

// const fetchAcceptsMessage = useCallback(async()=>{
// setIsSwitchingLoading(true);

// try {
  
//  const response =  await axios.get('/api/accept-messages')
//     setValue('acceptMessage',response.data.isAcceptingMessage)

//   } catch (error) {
  
//     const axiosError = error as AxiosError<ApiResponse>
//   toast("success",{
//     description:axiosError.response?.data.message||"failed to fetch message settings",
//   })
// }finally{
//   setIsSwitchingLoading(false)
// }

// },[])

// // fetchAcceptsMessage();







// const fetchMessages = useCallback(async (refresh: boolean = false) => {
//   setIsLoading(true);
//   setIsSwitchingLoading(false);

//   try {
//     const response = await axios.get<ApiResponse>('/api/get-messages');

//     const messages = response.data?.message ?? [];
//     setMessage(messages);
//     // console.log("Fetched Messages:", messages);

//     if (refresh) {
//       toast("success", {
//         description: "Showing latest messages",
//       });
//     }
//   } catch (error) {
//     const axiosError = error as AxiosError<ApiResponse>;

//     toast("error", {
//       description:
//         axiosError.response?.data?.message ||
//         "Failed to fetch message settings",
//     });
//   } finally {
//     setIsLoading(false);
//     setIsSwitchingLoading(false);
//   }
// }, [setIsLoading, setIsSwitchingLoading, setMessage]);



// useEffect(()=>{
// if (!session ||!session.user) return
// fetchAcceptsMessage()
// fetchMessages()
// },[session,setValue,fetchAcceptsMessage,fetchMessages])



// //handelSwitch change
// const handelSwitchChange =async()=>{
// // if(!isSwitchingLoading){  //not true then 
// // setIsSwitchingLoading(true)
// // }

 

// try {
//   const response = await axios.post<ApiResponse>('api/accept-messages',{
//     acceptMessages:!acceptMessages
//   })
//   setValue("acceptMessage",!acceptMessages)
//   toast("success",{
//     description:response.data.message
//   })




// } catch (error) {
//    const axiosError = error as AxiosError<ApiResponse>;
//     toast("error", {
//       description: axiosError.response?.data.message || "Failed to fetch message settings",
//     });

//   }
// }

// //return user url and copy button 

// const user = session?.user as User  
// const username = user?.username
// // console.log("username is : " ,username);

// const baseUrl = `${window.location.protocol}//${window.location.host}`;
// console.log(baseUrl);

// const profileUrl = `${baseUrl}/u/${username}`


// const copyToClipboard = () =>{
// navigator.clipboard.writeText(profileUrl);
// toast("success",{
// description:"Profile Url has beem copied to Clipboard"
// })
// }




// if (!session || !session.user) {
//   return <div>Please login </div>
// }



//   return (
// <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//   <h1 className="text-4xl font-bold mb-4"> User Dashboard </h1>

//   <div className="mb-4">
// <h2 className="text-4xl font-bold mb-4"> Copy Your unique Link </h2>

//  <div className="flex items-center">
// <input type="text"  value={profileUrl} 
// className="input input-bordered w-full  p-2 mr-2"
// disabled 
// id="" />
// <Button onClick={copyToClipboard}>Copy</Button>
//  </div>
 
//   </div>

// <div className="mb-4">
  
// <Switch
// {...register('acceptMessage')}
//   checked={acceptMessages}
//   onCheckedChange={handelSwitchChange}
//   disabled={isSwitchingLoading}
// />

// <span className="ml-2">
// Accept Messages : {acceptMessages?"On":"Off"}
// </span>
// </div>
// <Separator/>
// <Button className="mt-4"
// variant={'outline'}
// onClick={(e)=>{e.preventDefault()
//   fetchMessages(true)
//   }}>
// {isLoading?(
// <Loader2 className="h-4 w-4 animate-spin"/>
// ) :(
//   <RefreshCcw className="h-4 w-4"/>
// )} 
//    </Button>
//     <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//   {message && message.length > 0 ? (
//     message.map((msg, index) => (
//       <MessageCard
//         key={index} // use _id if available
//         message={msg}
//         onMessageDelete={handleDeleteMessage}
//       />
//     ))
//   ) : (
//     <p className="col-span-full text-gray-500">No messages to display.</p>
//   )}
// </div>

// </div>

//   )
// };

// export default page;



"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import MessageCard from "@/components/MessageCard";
import { AcceptMessage } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/Apiresponse";
import { User } from "next-auth";
import { Message } from "@/models/User";
import { CardContent } from "@/components/ui/card";



const Page = () => {
  const [message, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchingLoading, setIsSwitchingLoading] = useState(false);

  const { data: session } = useSession();
  const user = session?.user as User;
  const username = user?.username;
// console.log(message);
// console.log(JSON.stringify(message, null, 2));

  const form = useForm({
    resolver: zodResolver(AcceptMessage),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessage");

  const handleDeleteMessage =async (messageId: string) => {
    console.log(messageId)
    setMessage((prev) => prev.filter((msg) => msg._id !== messageId));

//api call here 

try {
  const response = await axios.delete(`/api/delete-message/${messageId}`)
  
  if(response?.data?.success){
    toast.success(
        <div>
          <div className="text-sm font-semibold">Success</div>
          <div className="text-black text-sm">
            {response.data.message || "Successfully sent message"}
          </div>
        </div>
      );
  }else{
    toast.error(
        <div>
          <div className="text-sm font-semibold">failed</div>
          <div className="text-black text-sm">
            {response.data.message || "faile delete message"}
          </div>
        </div>
      );
  }

} catch (error) {
  console.log("error deleting messages :" ,error)
}


  };

  const fetchAcceptsMessage = useCallback(async () => {
    setIsSwitchingLoading(true);
    try {
      const response = await axios.get("/api/accept-messages");
      setValue("acceptMessage", response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("error", {
        description: axiosError.response?.data.message || "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchingLoading(false);
    }
  }, [setValue]);


  //fetch messages
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchingLoading(false);

      try {
         const response = await axios.get<ApiResponse>("/api/get-messages");
  setMessage(response?.data?.message);

  if (refresh) {
    toast("success", {
      description: "Showing latest messages",
    });
  }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast("error", {
          description: "Failed to fetch message settings",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchingLoading(false);
      }
    },
    [setIsLoading, setIsSwitchingLoading, setMessage]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchAcceptsMessage();
    fetchMessages();
  }, [session, setValue, fetchAcceptsMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessage", !acceptMessages);
      toast("success", {
        description: "message accepting is allow",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("error", {
        description: "Failed to update setting",
      });
    }
  };

  if (!session || !session.user) {
    return <div>Please login</div>;
  }

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast("success", {
      description: "Profile URL has been copied to clipboard",
    });
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      {/* Copy Link Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            className="border p-2 rounded w-full mr-2"
            disabled
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      {/* Switch */}
      <div className="mb-4">
        <Switch
          {...register("acceptMessage")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchingLoading}
        />
        <span className="ml-2">Accept Messages: {acceptMessages ? "On" : "Off"}</span>
      </div>

      <Separator />

      {/* Refresh Button */}
      <Button
        className="mt-4"
        variant={"outline"}
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
      </Button>

      {/* Message Cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {message && message.length > 0 ? (
   message.map((msg,index) => (
  <div key={index} className="border p-4 rounded shadow">
   <div className="flex  justify-between">
     <p>{msg.content}</p>
   <button   onClick={()=>handleDeleteMessage(msg._id.toString())} className="bg-red-500 text-white px-3 py-1 rounded-md">delete</button>
   </div>
    <p className="mt-2  text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
  </div>
)) 
         
        ) : (
          <p className="col-span-full text-gray-500">No messages to display.</p>
        )}

      
      </div>
    </div>
  );
};

export default Page;
