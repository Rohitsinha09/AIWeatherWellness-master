"use client"
import { useGlobalContext } from '@/app/ContextApi/GlobalContext'
import { thermo } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import React from 'react'
import { airQualityChecker } from '@/app/utils/mist';
function AirPollution() {
  const {airQuality} = useGlobalContext();

  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );
  }
  const airQualityIndex = airQuality.list[0].main.aqi * 10;
  const filteredIndex =  airQualityChecker.find((item) => {
    return item.rating === airQualityIndex;
  });
  return (
    <div
    className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 hover:hover-effect  dark:hover:border-gray-900
     dark:bg-dark-grey bg-zinc-100 shadow-lg dark:shadow-none col-span-full sm-2:col-span-2  md:col-span-2 xl:col-span-2 "
  >   <h2 className="flex items-center gap-2 font-medium">
   {thermo}Air Pollution
</h2>
<Progress value={airQualityIndex} max={100} className="progress" />
<p className=' text-sm dark:font-medium text-zinc-700 dark:text-zinc-300 font-semibold'> Air Quality is {filteredIndex?.description}.</p>
    </div>
  )
}

export default AirPollution
