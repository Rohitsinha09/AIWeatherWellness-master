import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const searchParams = req.nextUrl.searchParams;
     const city = searchParams.get("search");
    
  
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const dailyRes = await axios.get(url).then((res)=>{
      return res.data
    })
  
    const dailyData = await dailyRes;
    return NextResponse.json(dailyData);
  } catch (error) {
    console.log("Error fetching geocoded data");
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}