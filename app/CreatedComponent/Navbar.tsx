"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { DropDown } from './ThemeDropDown/DropDown'
import SearchDialog from './SearchDialog/SearchDialog'
import Image from "next/image";
function Navbar() {
  const router =useRouter();
  
  return (
    <div className=' w-full py-4 flex items-center justify-between'>
      <div className=' left flex xl:gap-3  items-center '>
      <Image className=' md:block hidden'
            src="/logo-white.svg"
            alt="compass"
            width={30}
            height={10}
          />
          <h1 className=" font-size text-lg font-mono  text-dark-grey  font-bold  dark:font-normal dark:text-green-300 hidden xl:block">AiWeatherWellness</h1>
      </div>
      <div className=' search-container flex shrink-0 w-full gap-2 sm:w-fit'>
        <SearchDialog/>
       <div className="btn-group flex items-center gap-2">
       <DropDown/>
       <Button className='source-code flex items-center gap-2' onClick={()=>{
        router.push("/GoggleGemini")
       }}>  <Image className=' block'
       src="/gemini_icon.png"
       alt="Gemini"
       width={30}
       height={20}
     /> Chat With AI</Button>
       </div>
      </div>
      
    </div>
  )
}

export default Navbar
