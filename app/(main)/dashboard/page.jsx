"use client"

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  updateUsername } from "@/app/actions/user";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { usernameSchema } from "@/app/lib/validator";
import { getLatestUpdates } from "@/app/actions/dashboard";
import { format } from "date-fns";




const Dashboard = () => {
  const { user, isLoaded } = useUser()

  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(usernameSchema)
  })
  //we pass here our actions(updateUsername) which coming from here @/app/actions/users
  const { loading, error, data, fn: fnUpdateUsername } = useFetch(updateUsername)
  const onSubmit = async (data) => {
    fnUpdateUsername(data.username)
  }
  useEffect(() => {
    setValue("username", user?.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const {
    loading: loadingUpdates,
    data: upcomingMeetings,
    fn: fnUpdates,
  } = useFetch(getLatestUpdates);

  useEffect(() => {
    (async () => await fnUpdates())();
  }, []);
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome,{user?.firstName}</CardTitle>
        </CardHeader>
        <CardContent>
          {!loadingUpdates ? (
            <div className="space-y-6 font-light">
              <div>
                {upcomingMeetings && upcomingMeetings?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {upcomingMeetings?.map((meeting) => (
                      <li key={meeting.id}>
                        {meeting.event.title} on{" "}
                        {format(
                          new Date(meeting.startTime),
                          "MMM d, yyyy h:mm a"
                        )}{" "}
                        with {meeting.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No upcoming meetings</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading updates...</p>
          )}
        </CardContent>
      </Card>
      <Card>

        <CardHeader>
          <CardTitle>Your unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center gap-2">
                <span>{window?.location.origin}/</span>
                <Input {...register("username")} placeholder="Username..." />
                {
                  errors?.username && <p className="text-red-500 text-sm mt-1">{errors?.username.message}</p>
                }
                {
                  error && <p className="text-red-500 text-sm mt-1">{errors?.message}</p>
                }
              </div>
            </div>
            {
              loading && <BarLoader className="mb-4" width={"100%"} color='#36d7b7' />
            }
            <Button type="submit" className="mt-4">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard