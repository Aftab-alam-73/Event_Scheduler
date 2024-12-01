"use client"
import React from 'react'
import Autoplay from "embla-carousel-autoplay"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    
   
  } from "@/components/ui/carousel"
  import { Card, CardContent } from "@/components/ui/card";

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content:
        "Schedulrr has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "David Lee",
      role: "Freelance Designer",
      content:
        "As a freelancer, Schedulrr helps me stay organized and professional. My clients love how easy it is to book time with me.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Emily Chen",
      role: "Startup Founder",
      content:
        "Schedulrr streamlined our hiring process. Setting up interviews has never been easier!",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Michael Brown Hi",
      role: "Sales Executive",
      content:
        "I've seen a 30% increase in my meeting bookings since using Schedulrr. It's a game-changer for sales professionals.",
      image: "https://i.pravatar.cc/150?img=4",
    },
  ];
    
const Testimonial = () => {
  return (
    <div>
       <Carousel className="w-full mx-auto" plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
      <CarouselContent className="-ml-1">
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
           
              <Card className="h-full">
                <CardContent>
                  <div className='p-6 flex flex-col'>
                    <div className='flex '>
                    <div>
                    <Avatar className="h-12 w-12 mr-4">
      <AvatarImage src={testimonial.image} alt="testimonial Image" />
      <AvatarFallback>{testimonial.name.split(" ").map((n)=>n[0]).join("")}</AvatarFallback>
    </Avatar>
                    </div>
                 
            
                    <div className='flex flex-col'>
                    <span className='text-gray-900 font-bold text-md'>{testimonial.name}</span>
                    <span className='text-sm text-blue-800/80'>{testimonial.role}</span>
                    </div>
                    </div>
                  <p className='text-gray-600 mb-4 mt-4'>
                    &quot;{testimonial.content}&quot;
                  </p>
                  </div>
                </CardContent>
              </Card>
            
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
    </div>
  )
}

export default Testimonial