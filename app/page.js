import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


import Image from "next/image";
import Link from "next/link";
import Testimonial from "@/components/testimonial";
import { checkUser } from "@/lib/checkUser";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];

export default async function Home() {
  const user= await checkUser()
  return (
    <main className="container mx-auto px-4 py-16">
      <div className=" flex flex-col lg:flex-row mb-24 gap-12 items-center justify-between">
        <div className="lg:w-1/2">
          <h1 className="text-7xl pb-6 gradient-title">Simplify Your  Scheduling</h1>
          <p className="text-xl text-gray-600 mb-10">
            Schedulerr helps you to manage your time effectively.Create events ,set your availability,and let others book time with you seamlessly.
          </p>
          <Link href={user?"/dashboard  ":"/"}>
            <Button className="text-lg" size="lg">Get Started After Login<ArrowRight className="ml-2 h-5 w-5" /></Button>
          </Link>
        </div >
        <div className="lg:w-1/2 flex justify-center ">
          <div className="relative w-full max-w-md aspect-square">
            <Image src="/poster.png" alt="poster image" layout="fill" objectFit="contain" className="w-auto" />
          </div>

        </div>
      </div>
      <div className="mb-24">
        <h2 className=" mb-12 text-center text-blue-600 text-3xl font-bold">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {
            features.map((feature, index) => {
              return (
                <Card key={index} className=" flex flex-col justify-center items-center">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
                    <CardTitle className="text-blue-600">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600"> {feature.description}</p>
                  </CardContent>

                </Card>

              )
            })
          }
        </div>

      </div>
      <div className="mb-24">
        <h2 className=" mb-12 text-center text-3xl font-bold text-blue-600">
          What Our User Say
        </h2>
        <div>
          <Testimonial />
        </div>
      </div>

      <div className="mb-24">
        <h2 className=" mb-12 text-center text-3xl font-bold text-blue-600">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {
            howItWorks.map((step, index) => (
              <div key={index} className="text-center ">
                <div className="bg-blue-300 rounded-full w-16 h-16 flex justify-center items-center font-bold mx-auto mb-4">
                  <span className="text-blue-700 text-xl">{index + 1}</span>
                </div>
                <h3 className="text-lg text-gray-950 font-semibold mb-2">
                  {step.step}
                </h3>
                <p className="text-sm text-gray-900/70 ">{step.description}</p>
              </div>
            ))
          }
        </div>
        <div>

        </div>
      </div>
<div className="bg-blue-600   rounded-lg text-center p-8  text-white ">
  
  <h3 className="text-3xl font-bold mb-4">Ready To Simplify Your Scheduling?</h3>
  <p className="text-xl  mb-6">Join thousands of professionals who trust Schedulerr for efficient timemanagement.</p>
    <Link href={user?"/dashboard":"/"}>
    <Button size='lg' variant="secondary" className="text-blue-600">
      Start for Free After Login<ArrowRight  className="w-5 h-5 ml-2"/>
    </Button>
    </Link>

</div>
    </main>
  );
} 
