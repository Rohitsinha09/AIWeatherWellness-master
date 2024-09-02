"use client"
import moment from "moment"
import { useGlobalContext } from '@/app/ContextApi/GlobalContext'
import { Icon, time, unixToTime } from '@/app/utils/mist';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import { sunriseIcon, sunsetIcon } from "@/app/utils/Icons";
import { Progress } from '@/components/ui/iconprogress';
import {Range} from "../../utils/mist" 
function Sun() {
    const {forecast} = useGlobalContext();
    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return <Skeleton className="h-[12rem] w-full" />;
      }
      const sunSettimes = forecast?.sys?.sunset;
      const sunRisetimes = forecast?.sys?.sunrise;
  const timezone = forecast?.timezone;
  const sunset = unixToTime(sunSettimes, timezone);
  const sunrise = unixToTime( sunRisetimes, timezone);
 console.log(sunset);
  const localMoment = moment().utcOffset(timezone / 60);
  const CurrentTime = localMoment.format("HH:mm");

const definedTime="12:00";
 
         const updateset=time(definedTime,sunset);
         const updaterise=time(definedTime,sunrise);
         const {range ,val1,val2,val3} = Range(sunrise ,sunset,CurrentTime);
         const Icons = Icon(sunrise ,sunset,CurrentTime);
         const calVal= (150*val1)/100;
         console.log("calval",calVal);
         console.log("val1",val1);
         console.log("CurrentTime",CurrentTime);
         console.log("sunset",updateset);
         console.log("sunrise", updaterise);
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg  bg-zinc-100 flex flex-col gap-8 dark:bg-dark-grey  shadow-lg dark:shadow-none  hover:hover-effect  dark:hover:border-gray-900">
       <div className="flex justify-between font-medium">
       
      
        <span>{sunriseIcon}Sunrise</span>
        <span >{sunsetIcon}Sunset</span>
       
       </div>
       <Progress max={range} value={calVal} val2={val2} val3={val3} icon={Icons} className="progress flex items-center bg-gray-400 " />
       <div className=" flex justify-between">
        
        <span>{updaterise}</span>
        <span>{updateset}</span>
     
       </div>
    </div>
  )
}

export default Sun
