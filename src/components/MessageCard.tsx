"use client";

import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/models/User";
import { toast } from "sonner";
import { ApiResponse } from "@/types/Apiresponse";
import axios from "axios";


type MessageCardProps = {
  message: string;
  onMessageDelete: (id: string) => void;
};


const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const handelDeleteConfirm = async () => {
    console.log("delete message id:", message._id);

    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);

      if (response.data.success) {
        toast.success(response.data.message); // Adjust depending on toast lib
        onMessageDelete(message._id?.toString()||"");
      } else {
        toast.error("Failed to delete the message.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the message.");
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
          <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"> <X  className='w-5 h-5' />   </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handelDeleteConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
       
      </CardContent>
      <CardFooter>
     
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
