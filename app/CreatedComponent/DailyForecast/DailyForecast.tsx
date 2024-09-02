"use client"
import { useGlobalContext } from '@/app/ContextApi/GlobalContext';
import { Skeleton } from '@/components/ui/skeleton';
import { CelsiusConvertor } from "../../utils/mist";
 import React from 'react'
import { Atmosphere, ThunderStrom, clearSky, cloudy, drizzleIcon, rain, snow } from '@/app/utils/Icons';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import moment from 'moment';
 
 function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();
  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  if (!forecast || !weather) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );
  const { main: weatherMain } = weather[0];

  if (todaysForecast.length < 1) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2" />
    );
  }

  const getIcon = () => {
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
   return (
     <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 bg-zinc-100 hover:hover-effect  dark:hover:border-gray-900   dark:bg-dark-grey  shadow-lg dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2">
       <div className="h-full flex gap-10 overflow-hidden">
        {todaysForecast.length < 1 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-[3rem] line-through text-rose-500">
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                      >
                        <p className=" dark:text-gray-300   text-black">
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{getIcon()}</p>
                        <p className="mt-4">
                          {CelsiusConvertor(forecast.main.temp)}°C
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
     </div>
   )
 }
 
 export default DailyForecast
 