import moment from "moment";
import {sun,moon} from "../../app/utils/Icons"
export const CelsiusConvertor=(kelvin:number)=>{
         return Math.round(kelvin -273.15);
}

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};
export const time=(time1: string, time2: string):string =>{
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;
  let diffMinutes = totalMinutes1 - totalMinutes2;
  if (diffMinutes < 0) {
    diffMinutes =-diffMinutes; 
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    // Format the result
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}PM`;// Add 24 hours in minutes to handle cases like "12:00" - "16:18"
} else{
  return `${time2}AM`
}

}

export const Range=(sunrise:string ,sunset:string ,currentTime:string)=>{
  const [hours1, minutes1] = sunrise.split(':').map(Number);
  const [hours2, minutes2] = sunset.split(':').map(Number);
  const [hours3, minutes3] = currentTime.split(':').map(Number);
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;
  const totalMinutes3=hours3*60+ minutes3;
  let range = 1440;


  // percentage
  let val1= (totalMinutes3/range)*100;
  let val2= (totalMinutes1/range)*150;
  let val3=(totalMinutes2/range)*150;

    return {range,val1,val2,val3};


  
           
}
export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};
export const Icon=(sunrise:string ,sunset:string ,currentTime:string)=>{
  const [hours1, minutes1] = sunrise.split(':').map(Number);
  const [hours2, minutes2] = sunset.split(':').map(Number);
  const [hours3, minutes3] = currentTime.split(':').map(Number);
    if(hours3<=12){
      if( hours3>=hours1){
        if(minutes3>=minutes1){
          return sun
        }
        return moon   
      }else{
        return moon
      }
    }
  else {
    if(hours3==hours2){
      if(minutes3>=minutes2){
        return moon
      }else{
        return sun
      }
      
    } else if(hours3>hours2){
            return moon
    }
    else{
      return sun
    }
  }
}
export const airQualityChecker =[
    {
        rating: 10,
        description: "excellent",
      },
      {
        rating: 20,
        description: "good",
      },
      {
        rating: 30,
        description: "satisfactory",
      },
      {
        rating: 40,
        description: "fair",
      },
      {
        rating: 50,
        description: "moderate",
      },
      {
        rating: 60,
        description: "moderate",
      },
      {
        rating: 70,
        description: "poor",
      },
      {
        rating: 80,
        description: "poor",
      },
      {
        rating: 90,
        description: "very poor",
      },
      {
        rating: 100,
        description: "very poor",
      },
]
