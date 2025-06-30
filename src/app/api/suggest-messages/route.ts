

// import OpenAI from 'openai';

// import { OpenAIStream, streamText,StreamingTextResponse } from 'ai';


// // import OpenAI from 'openai';



// const openai = new OpenAI({
//     apiKey:process.env.OPENAI_API_KEY,
// });


// export const runtime = 'edge';

// export async function POST(req: Request) {
//  try {
//      const { messages } = await req.json();

//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages,
//   });



//   const stream = OpenAIStream(response);

//   return new StreamingTextResponse(stream);

//  } catch (error) {
//     console.log("Error ai prompting suggestion...",error);
//  }

// }




///working code below

// import { streamText } from 'ai';
// import {openai} from '@ai-sdk/openai'; // ✅ correct

// export const runtime = 'edge';

// export async function POST(req: Request): Promise<Response> {
//   const { messages } = await req.json();

//   const result = streamText({
//       model: openai('gpt-4o'), // ✅ no `new` keyword
//       messages,
//   });

//   return result.toDataStreamResponse();
// }






import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {

const prompt = `You are an expert holiday inventor. Create a unique new holiday, including:
- The name of the holiday
- The date it's celebrated
- The origin story behind it
- How people celebrate it
- Any special foods, traditions, or symbols involved

Be imaginative but keep it concise (under 200 words).`;

    const { textStream } =  streamText({
      model: openai('gpt-3.5-turbo-instruct'),
    maxTokens:400,
      prompt
    });

    // Convert the streamText output to a web-readable stream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const part of textStream) {
          controller.enqueue(new TextEncoder().encode(part));
        }
        controller.close();
      },
    });

console.log("this is a stream : ",stream);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });



  } catch (error) {
    if (error instanceof OpenAI.APIError) {
        const {name ,status,headers,message} = error;
          return NextResponse.json({
            name,
            status,
            headers,
            message
          },{status:200})
    }
    console.error('error suggestion messages:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
