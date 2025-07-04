'use client'
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { verifySchema } from '@/schemas/verifySchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/Apiresponse';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const VerifyAccount = () => {

    const router = useRouter();
    const params = useParams<{username:string}>();
    // const {Toaster} = useToast()

      const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
      });


const onSubmit = async (data:z.infer<typeof verifySchema>)=>{

try {
const response = await axios.post<ApiResponse>('/api/verify-code',{
    username:params.username,
    code:data.code
})    


if (response.data.success) { //if true
    toast("success",{
        description:"Successfully verify User",
    })

    router.replace('/sign-in')
}



} catch (error) {
   const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
   
      toast.error("Signup failed", {
        description: errorMessage || "Something went wrong",
      });  

}

}

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
    <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
<div className='text-center'>
<h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
    Verify Your Account
</h1>
<p className='mb-4'>
    Enter the verification code sent to your email
</p>
</div>


 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>verification code</FormLabel>
              <FormControl>
                <Input placeholder="enter verify code" {...field} />
              </FormControl>

              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Verify</Button>
      </form>
    </Form>
    </div>
    </div>
  )
}

export default VerifyAccount
