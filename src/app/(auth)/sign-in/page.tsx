// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// // import Link from 'next/link'
// import { useDebounceValue } from "usehooks-ts";
// import { toast } from "sonner";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { signUpSchema } from "@/schemas/signupSchema";
// import axios from "axios";
// import { AxiosError } from "axios";
// import { ApiResponse } from "@/types/Apiresponse";

// const page = () => {
//   const [username, setusername] = useState("");
//   const [usernameMessage, setusernameMessage] = useState("");
//   const [isCheckingUsername, setisCheckingUsername] = useState(false);
//   const [isSubmitting, setisSubmitting] = useState(false);

//   //automatically debounce value
//   const debouncedUsername = useDebounceValue(username, 300);

//   const router = useRouter();

//   //zod implmentation
//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),

//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
    
//   });

//   useEffect(() => {
//     async function checkUsername() {
//       try {
//         const api = await axios.get(
//           `/api/check-username-unique?username=${debouncedUsername}`
//         );

//         setusernameMessage(api.data.message);
//       } catch (error) {
//         const axiosError = error as AxiosError<ApiResponse>;
//         setusernameMessage(
//           axiosError.response?.data.message ?? "Error checking username"
//         );
//       } finally {
//         setisCheckingUsername(false);
//       }
//     }

//     checkUsername();
//   }, [debouncedUsername]);

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     setisSubmitting(true);

//     try {
//       const response = await axios.post<ApiResponse>("/api/sign-up", data);
//       toast.success("Success", {
//         description: response.data.message,
//       });

//       router.replace(`/verify/${username}`);
//       setisSubmitting(false);
//     } catch (error) {
//       console.log("Error in signing user", error);
//       const axiosError = error as AxiosError<ApiResponse>;
//       const errorMessage = axiosError.response?.data.message;
//       toast("error", {
//         description: errorMessage || "Failed Singnup",
//       });
//     }
//   };

//   return(
//     <div className="flex  justify-center items-center min-h-screen bg-gray-100">
      
//       <div className="w-full  max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
// <div className="text-center">
// <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//   Join Mystery Message
// </h1>

// <p className="mb-4">  
// Sign up to start your anonymous adventure

// </p>


// </div>

//       </div>
      
//       </div>
//   ) 
// };

// export default page;



"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ FIXED HERE
import { signUpSchema } from "@/schemas/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/Apiresponse";

const Page = () => {
  const [username, setusername] = useState("");
  const [usernameMessage, setusernameMessage] = useState("");
  const [isCheckingUsername, setisCheckingUsername] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 300);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    async function checkUsername() {
      try {
        const api = await axios.get(
          `/api/check-username-unique?username=${debouncedUsername}`
        );
        setusernameMessage(api.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setusernameMessage(
          axiosError.response?.data.message ?? "Error checking username"
        );
      } finally {
        setisCheckingUsername(false);
      }
    }

    checkUsername();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setisSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast.success("Success", {
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast.error("Signup failed", {
        description: errorMessage || "Something went wrong",
      });
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">
            Sign up to start your anonymous adventure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
