"use client";
import { useGlobalContext } from "@/app/ContextApi/GlobalContext";
import { people } from "@/app/utils/Icons";
import { formatNumber } from "@/app/utils/mist";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Population() {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;

  if (!fiveDayForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey  shadow-lg bg-zinc-100 hover:hover-effect  dark:hover:border-gray-900 dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-bold dark:font-medium">
          {people} Population
        </h2>
        <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
      </div>
      <p className="text-sm  font-semibold dark:font-medium">Latest UN population data for {city.name}.</p>
    </div>
  );
}

export default Population;