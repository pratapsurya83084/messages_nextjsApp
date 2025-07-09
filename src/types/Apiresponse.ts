



import {Message} from '@/models/User';

export interface ApiResponse{
    success:boolean;
    message:Message[]; //string
    isAcceptingMessages?:boolean
    messages?:Array<Message>
}








