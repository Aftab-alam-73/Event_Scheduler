

import { getUserAvailability } from '@/app/actions/availability'
import React from 'react'

import AvailabilityForm from "./_component/availability-form"
import { defaultAvailability } from '../events/data'

const AvailabilityPage = async() => {
    const availability=await getUserAvailability()
    // console.log(availability)
  return (
    <AvailabilityForm initialData={availability || defaultAvailability}/>
  )
}

export default AvailabilityPage