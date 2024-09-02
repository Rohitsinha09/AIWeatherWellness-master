"use client"

import { Spotlight } from "@/components/ui/Spotlight";
import AirPollution from "./CreatedComponent/AirPollution/AirPollution";
import Navbar from "./CreatedComponent/Navbar";
import Temperature from "./CreatedComponent/Temperature/Temperature";
import Sun from "./CreatedComponent/Sun/Sun";
import Wind from "./CreatedComponent/wind/Wind";
import DailyForecast from "./CreatedComponent/DailyForecast/DailyForecast";
import Uvindex from "./CreatedComponent/Uvindex/Uvindex";
import Population from "./CreatedComponent/Population/Population";
import FeelsLike from "./CreatedComponent/FeelsLike/FeelsLike";
import Humidity from "./CreatedComponent/Humidity/Humidity";
import Visibility from "./CreatedComponent/Visibility/Visibility";
import Pressure from "./CreatedComponent/Pressure/Pressure";
import FiveDayForecast from "./CreatedComponent/FiveDayForecast/fiveDayForecast";
import defaultStates from "./utils/defaultStates";
import { useGlobalContextUpdate } from "@/app/ContextApi/GlobalContext";
import Image from "next/image";
import dynamic from 'next/dynamic';
const DynamicMapbox = dynamic(() => import('./CreatedComponent/Map/Map'), {
  ssr: false
});

export default function Home() {

  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
 
  return (
    <main className=" min-h-screen">
      
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
    <div className=" h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.04]    ">
     
    <div className=" mx-[3rem] lg:mx-[3rem]  xl:mx-[4rem] 2xl:mx-[10rem] m-auto">
      <Navbar/>
      <div className=" pb-4 flex flex-col gap-4 md:flex-row">
        {/* left-section */}

        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[32rem]">
       <Temperature/>
      <FiveDayForecast/>
          </div>
          {/* Right-section */}
        <div className="flex flex-col  w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution/>
            <Sun/>
           <Wind/>
            <DailyForecast/>
            <Uvindex/>
            <Population/>
            <FeelsLike/>
            <Humidity/>
            <Visibility/>
            <Pressure/>
          </div>
           

            <div className="mapbox-con mt-4 flex gap-4">
            <DynamicMapbox/>
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey  dark:shadow-none  shadow-lg bg-zinc-100  hover:border-slate-600     dark:hover:border-zinc-600"
                      onClick={() => {
                        getClickedCityCords(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    
    </div>
    <footer className="py-4 flex  justify-start sm:justify-center   pb-5 sm:pb-8">
        <p className="footer-text text-sm flex items-center gap-1  pl-3  sm:pl-0">
          Made by
          <Image 
          src={"/logo-white.svg"} alt="logo" width={20} height={20} />
          <a
           
            target="_blank"
            className=" text-green-300 font-bold"
          >
            Kajal
          </a>
        </p>
      </footer>
    </main>
  );
}
