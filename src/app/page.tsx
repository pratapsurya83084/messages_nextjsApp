
// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// // import messages from '@/messages.json';
// // import Autoplay from 'embla-carousel-react';

// export default function Home() {
//   return (
// <main className=" justify-center items-center px-4 md:px-24 py-12"> 
// <section className="text-center mb-8 md:mb-12">  
//   <h1 className="text-3xl md:text-5xl font-bold"> Drive into the world of Anonymous Coversations</h1>
//   <p className="mt-3 md:mt-4 text-base md:text-lg"> Explore Mystry Message - Where your identity remains a secret </p>
// </section>


//    <Carousel className="flex-grow flex justify-center items-center w-full max-w-xs">
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <span className="text-4xl font-semibold">{index + 1}</span>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>

// </main>


//   );
// }




// "use client"

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import messages from '@/messages.json';
// import Autoplay  from 'embla-carousel-autoplay';
// import { Skeleton } from "@/components/ui/skeleton"


// export default function Home() {


// const currentDate = new Date();


//   return (
//     <main className="flex flex-col justify-center items-center px-4 md:px-24 py-12">
//       <section className="text-center mb-8 md:mb-12">
//         <h1 className="text-3xl md:text-5xl font-bold">
//           Drive into the world of Anonymous Conversations
//         </h1>
//         <p className="mt-3 md:mt-4 text-base md:text-lg">
//           Explore Mystery Message – Where your identity remains a secret
//         </p>
//       </section>

//       <Carousel className="w-full max-w-xs"
//       plugins={[Autoplay({delay:2000})]}
//       >
//       <CarouselContent>
//           {messages.map((sms, index) => (
//             <CarouselItem key={index}>
//               <div className="p-1">
//                 <Card>
//                   <CardHeader>{sms?.title}</CardHeader>
//                   <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
//                     <span className="text-lg font-semibold">{sms?.content}</span>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}

//           {/* Example fallback skeleton (optional) */}
//           {messages.length === 0 &&
//             Array.from({ length: 3 }).map((_, index) => (
//               <CarouselItem key={index}>
//                 <div className="p-1">
//                   <Card>
//                     <CardHeader>
//                       <Skeleton className="h-6 w-3/4" />
//                     </CardHeader>
//                     <CardContent className="flex flex-col aspect-square items-center justify-center p-6 space-y-3">
//                       <Skeleton className="h-4 w-full" />
//                       <Skeleton className="h-4 w-5/6" />
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CarouselItem>
//             ))}
//         </CarouselContent>



//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
    
//     <footer className="mt-20 text-sm text-gray-500">
//         © {currentDate.getFullYear()} Mystery Message. All rights reserved.
//       </footer>
//     </main>
  
//   );
// }

'use client'

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import messages from '@/messages.json';

export default function Home() {
  const [sms, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
// console.log(messages);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMessages(messages);
      setLoading(false);
    }, 2000); // Simulated 2s loading
  }, []);

  return (
    <main className="flex flex-col justify-center items-center px-4 md:px-24 py-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Drive into the world of Anonymous Conversations
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Explore Mystery Message – Where your identity remains a secret
        </p>
      </section>

      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                      </CardHeader>
                      <CardContent className="flex flex-col aspect-square items-center justify-center p-6 gap-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : messages.map((sms, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader>{sms?.title}</CardHeader>
                      <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                        <span className="text-lg font-semibold">{sms?.content}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}

