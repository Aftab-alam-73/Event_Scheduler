"use client"

import React,{useState} from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'
import { Link, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { deleteEvent } from '@/app/actions/event-action';

const EventCard = ({event,username,isPublic=false}) => {
    const [isCopied, setIsCopied] = useState(false);
    const router=useRouter()
const {loading,fn:fnDeleteEvent}=useFetch(deleteEvent)

const handleDelete=()=>{
    if(window?.confirm("Are  you sure you want to delete this event? ")){
        fnDeleteEvent(event.id)
router.refresh()
    }
}
    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(
            `${window?.location.origin}/${username}/${event.id}`
          );
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      };
    
      const handleCardClick = (e) => {
        if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
          window?.open(
            `${window?.location.origin}/${username}/${event.id}`,
            "_blank"
          );
        }
      };

  return (
    <Card onClick={handleCardClick}>
  <CardHeader>
    <CardTitle className="text-2xl">{event.title}</CardTitle>
    <CardDescription className="flex justify-between">
        <span>{event?.duration} mins | {event.isPrivate?"Private":"Public"}</span>
        <span>{event?._count?.booking} Bookings</span>
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* <p>{event.description.substring(0,event.description.indexOf("."))}.</p> */}
    <p>{event?.description}.</p>
  </CardContent>
  {!isPublic && (
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex items-center"
          >
            <Link className="mr-2 h-4 w-4" />
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      )}
</Card>

  )
}

export default EventCard