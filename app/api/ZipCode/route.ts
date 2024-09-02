
import axios from "axios"
import { NextRequest , NextResponse } from "next/server"

export async function GET(req:NextRequest){
    try {
      const searchParams = req.nextUrl.searchParams;
      const zipCode= searchParams.get("zipCode");
      const countryCode = searchParams.get("countryCode");
    
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        console.log(apiKey);
    
        const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`;
        const res =  await axios.get(url).then((res)=>{
          return  res.data;
           });
           console.log("zipcode",res.data)
       return NextResponse.json(res);
      } catch (error) {
        console.log("Error in getting Zip Code data ", error);
        return new Response("Error fetching ZipCode data", { status: 500 });
      }
}