"use client";

import React, { useRef, useState} from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Volume2 } from "lucide-react";

const Page = () => {
  const [messages, setMessages] = useState("");
const { data: session } = useSession();

// console.log("Access token",session?.user?.username)
const username = session?.user?.username
  // Debounce function
  function debounce(fn: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }

//send =>  username, content 
  // Debounced message sender
  const sendMessage = async (value: string) => {
    console.log("Sending message:", value);
    try {
      const response = await axios.post("/api/send-messages", {
        username,
        content: value,

      });
      console.log("Success", response.data);
    if (response.data.success) {
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
        {response.data.message || "failed sent message"}
      </div>
    </div>
  );
}

    } catch (error) {
      console.log("Error sending message");
    }
  };

  const debouncedSendMessage = useRef(debounce(sendMessage, 2000)).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessages(e.target.value);
    debouncedSendMessage(e.target.value); // debounce on typing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(messages); // optional: send immediately on form submit
    setMessages("");
  };



//   speech Ai
 const handleReadAloud = () => {
    const utterance = new SpeechSynthesisUtterance(messages);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center mt-[20%]">
          <input
            className="h-10 w-62 md:w-80 lg:w-96 border rounded-sm p-2"
            type="text"
            required
            value={messages}
            placeholder="send messages..."
            onChange={handleChange}
          />

          <button className="mt-5 border px-3 py-2 rounded-sm bg-black text-white">
            Send it
          </button>
        </div>
      </form>

{/* Read message by assistent audio */}

 <div className="flex gap-2 items-start mt-20">
      <div className="relative w-full">
        <textarea
          rows={5}
          className="m-0 border p-2 w-full pr-10"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
        />
        <button
          onClick={handleReadAloud}
          className="absolute top-1 right-1 text-gray-600 hover:text-red-500"
        >
          <Volume2 className="w-5 h-5" />
       
        </button>
      </div>


      
    </div>


    </div>
  );
};

export default Page;
