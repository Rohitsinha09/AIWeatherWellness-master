"use client"
import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";
const GlobalContext= createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider=({ children })=>{
   const [forecast ,setForecast] =useState({});
   const [airQuality, setAirQuality] = useState({});
   const [fiveDayForecast, setFiveDayForecast] = useState({});
   const [uvIndex, seUvIndex] = useState({});
   const [activeCityCoords, setActiveCityCoords] = useState([
  ]);
  const[Icon,setIcon]=useState(false);
  const [inputValue, setInputValue] = useState("");
  const[event,setEvent]=useState("");
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [zipCodeCity ,setzipCodeCity] = useState("");
   const fetchForecast = async(lat,lon) =>{
    try{
        const res= await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
        setForecast(res.data);
       console.log("forecast",res.data);
    }
         
    catch(error) {
        console.log("Error:", error);
        console.log("Response data:", error.message);
    }
   }

  // Air Quality
  const fetchAirQuality = async (lat,lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      console.log(res.data)
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };
  // five day forecast
  const fetchFiveDayForecast = async (lat,lon) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
        console.log("fiveDay forecase",res.data);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };
  //fetch uv data
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
       console.log("uvIndex",res.data);
      seUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching the forecast:", error);
    }
  };
    //geocoded list
    const fetchGeoCodedList = async (search) => {
      try {
        const res = await axios.get(`/api/geocoded?search=${search}`);
        console.log("dataof GeocodedList",res.data);
        setGeoCodedList(res.data);
        
      } catch (error) {
        console.log("Error fetching geocoded list: ", error.message);
      }
    };
    //Zip Code Data
    const fetchzipcodeData = async (zipCode) => {
      try {
        const countryCode ="IN";
        const res = await axios.get(`/api/ZipCode?zipCode=${zipCode}&countryCode=${countryCode}`);
        console.log("dataof ZipCode",res.data); 
        const {name}= await res.data;
    let cityName = name; 
          fetchGeoCodedList(cityName);
          setzipCodeCity(cityName);
      } catch (error) {
        console.log("Error fetching geocoded list: ", error.message);
      }
    };
     // handle input
     const handleInput = (e) => {
    setInputValue(e.target.value);
      if (e.target.value === "") {
          setGeoCodedList(defaultStates);
          setzipCodeCity("");
      }
  ;}
  const handleKeyDown = (e) => {
    setEvent(e.key);
    console.log("event", event);
};
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setActiveCityCoords([latitude, longitude]);
      },
      (error) => {
        setActiveCityCoords( 40.4165, -3.7026);
        console.error("Error getting current location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    setActiveCityCoords( 40.4165, -3.7026);
  }
}, []);
 


    useEffect(() => {
      const debouncedFetch = debounce((search) => {
        if (!isNaN(search)) {
          if(event =='Enter'){
            fetchzipcodeData(parseInt(search));
          }
          
        }else{
          fetchGeoCodedList(search);
        }
       
      }, 500);
  
      if (inputValue) {
        debouncedFetch(inputValue);
      }
  
      // cleanup
      return () => debouncedFetch.cancel();
    }, [inputValue,event]);
  

   useEffect(()=>{
    fetchForecast(activeCityCoords[0],activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0],activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0],activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0],activeCityCoords[1]);
   },[activeCityCoords]);
    return(
        
        <GlobalContext.Provider value={{forecast,airQuality,fiveDayForecast,uvIndex,setActiveCityCoords,geoCodedList,
         inputValue,setInputValue, handleKeyDown,
         handleInput,zipCodeCity,Icon,setIcon
         }}>
            <GlobalContextUpdate.Provider value={{ setActiveCityCoords,}}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
        )
}


export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);