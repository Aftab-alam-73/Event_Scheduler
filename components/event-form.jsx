"use client"

import { eventSchema } from '@/app/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm,Controller } from 'react-hook-form'
import React from 'react'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from './ui/button'
import useFetch from '@/hooks/use-fetch'
import { createEvent } from '@/app/actions/event-action'

const EventForm = ({onSubmitForm}) => {
    const router=useRouter()
 
    const{register,handleSubmit,formState:{errors},control}=useForm({
        resolver:zodResolver(eventSchema),
        defaultValues:{
            duration:30,
            isPrivate:true
        }
    })
const{loading,error,fn:fnCreatEvent}=useFetch(createEvent)//the useFetch hook is used for fetching data,saving data and many more things.its a custom hook.

const onSubmit= async(data)=>{
    await fnCreatEvent(data)
    if(!loading && !error) onSubmitForm()
    router.refresh()    

}

  return (
    <form className="px-5 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Event title</label>
            <Input id="title" {...register("title")} className="mt-1"/>
            {
                errors?.title && <p className="text-sm mt-1 text-red-500">{errors?.title.message}</p>
            }
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700"> Event description</label>
            <Input id="description" {...register("description")} className="mt-1"/>
            {
                errors?.description && <p className="text-sm mt-1 text-red-500">{errors?.description.message}</p>
            }
        </div>
        <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">duration(minutes)</label>
            <Input id="duration" {...register("duration",{valueAsNumber:true})} type="number" className="mt-1"/>
            {
                errors?.duration && <p className="text-sm mt-1 text-red-500">{errors?.duration.message}</p>
            }
        </div>
        <div>
            <label htmlFor="isPrivate" className="block text-sm font-medium text-gray-700">Event Privacy</label>
            <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value === "true")}
              value={field.value ? "true" : "false"}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
            {
                errors?.isPrivate && <p className="text-sm mt-1 text-red-500">{errors?.isPrivate?.message}</p>
            }
        </div>
        {error && <p className="text-sm mt-1 text-red-500">{errors?.message}</p>}
        <Button type="submit" disabled={loading}>{loading?"Submitting...":"Create Event"}</Button>
        
    </form>
  )
}

export default EventForm