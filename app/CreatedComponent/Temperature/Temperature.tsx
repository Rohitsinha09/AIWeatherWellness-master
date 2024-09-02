"use client"
import { useGlobalContext } from '@/app/ContextApi/GlobalContext'
import { Atmosphere, ThunderStrom, clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/Icons';
import { CelsiusConvertor } from '@/app/utils/mist';
import React, { useEffect, useState } from 'react'
import Moment from "moment";
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

function Temperature() {
    const {forecast} = useGlobalContext();
     const {timezone ,weather, main ,name} = forecast;
       if(!forecast || !weather || !name){
        return <div>Loading...</div>
       }
       const temp= CelsiusConvertor(main?.temp);
       const max_temp = CelsiusConvertor(main?.temp_max);
       const min_temp = CelsiusConvertor(main?.temp_min);

       const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
     const {main : weatherMain , description} = weather[0];

     const getIcon = (weatherMain:string) => {
      switch (weatherMain) {
        case "Drizzle":
          return drizzleIcon;
        case "Rain":
          return rain;
        case "Snow":
          return snow;
        case "Clear":
          return clearSky;
        case "Thunderstorm":
          return ThunderStrom;
        case "Atmosphere":
          return Atmosphere;
        case "Clouds":
          return cloudy;
        default:
          return clearSky;
      }
    };
     useEffect(() => {
    // upadte time every second
    const interval = setInterval(() => {
      const localMoment = Moment().utcOffset(timezone / 60);
      // custom format: 24 hour format
      const formatedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [timezone]);

  
       
  return (
    <CardContainer className="inter-var">
    <CardBody className=' flex flex-col border  hover:hover-effect  dark:hover:border-gray-900 rounded-lg pt-6 pb-5  px-4 justify-between  bg-zinc-100  dark:bg-dark-grey shadow-lg dark:shadow-none '>
      <CardItem  translateZ="50"  className=' flex items-center justify-between flex-row'>
        <span className=' font-medium'>{currentDay}</span>
        <span className=' font-medium'>{localTime}</span>
      </CardItem>
      <CardItem   translateZ="60" className=' pt-2 flex text-sm   gap-1 font-bold'>
        <span>{name}</span>
        <span>{navigation}</span>
      </CardItem>
      <CardItem translateZ="100" className="py-10  flex text-9xl font-bold justify-center items-center">{temp}°</CardItem>
     
       <div>
        <CardItem translateZ={20}>
        <span>{getIcon(weatherMain)} </span> 
       <p  className="pt-2 capitalize text-lg font-medium">{description}</p></CardItem>
       <CardItem translateZ={20} className="flex items-center gap-2">
          <span>Low: {min_temp}°</span>
          <span>High: {max_temp}°</span>
        </CardItem>
        </div>
    </CardBody>
    </CardContainer>
  )
}

export default Temperature
function moment() {
  throw new Error('Function not implemented.');
}

