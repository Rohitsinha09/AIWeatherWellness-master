"use client"
import React, { useEffect, useState }  from 'react'
import Image from "next/image";
import { DropDown } from '@/app/CreatedComponent/ThemeDropDown/DropDown';
import Sidebar from '../Sidebar/Sidebar';
import { useGlobalContext } from '@/app/ContextApi/GlobalContext';
import clsx from 'clsx';
import data from "../../../utils/data"
import {  ImgPlusIcon, MicIcon, SendIcon, VercelIcon } from '@/app/utils/Icons';
import { geminiContext } from '@/app/GeminiContext/Context';
function Main() {
    const {Icon} =useGlobalContext();
    const { recentPrompt,  showResult,  loading,  resultData,  input,  setInput , onSent,loadPrompt} = geminiContext();

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && input.trim()) {
            onSent();
        }
    };
   
  return (
    <div className={clsx('flex flex-row  h-auto     w-auto', Icon ? 'bg-black/50   min-w-fit ':'bg-inherit'  )}>
        <div className='sidebarComponet  min-h-screen  absolute sm:relative'>
            <Sidebar/>
        </div>
        <div className='mainComponent w-full  animate-fadeIn '>
        <nav className=' flex flex-row  justify-between  p-4 items-center '>
        <p  className=' text-2xl  text-zinc-600 dark:text-zinc-400 font-sans  sm:pl-0  pl-8'>Gemini</p>
        <div className= {clsx('flex flex-row items-center gap-4  pr-3 -z-10',Icon ? '-z-10' :' z-0')}>
        <Image src="/user_icon.png" alt="user-icon"
         width={40} height={40} className=' rounded-full'/>
        <DropDown/>
       
        </div>
        
      </nav>
      {/* container */}
      <div className='  w-auto   lg:h-auto' >
        <div className= {clsx('   h-full  mx-4  flex  justify-between  flex-col   gap-9 xl:mt-12',Icon ? ' xl:mx-48 lg:mx-32 ' :'  lg:mx-12 xl:mx-28')}>
            {!showResult ?<>
                <div className={clsx('Tittle flex  flex-col   gap-1  text-4xl sm:text-5xl  text-neutral-400 ',Icon ? '-z-20' :' z-0')}>
             <p ><span className=' text-style   animate-blinkit  '>Hello, Dev.</span></p>
             <p>How can I help you today?</p>
          </div>
           {/* content */}
           <div className= {clsx(Icon ? '-z-10' :' z-0 , grid  md:grid-cols-2  grid-cols-1  lg:grid-cols-3 xl:grid-cols-4  gap-4')}>
        
              {
                data.map((item, index)=>(
                    <div key={index} className='bg-cardColor  dark:bg-blackbg rounded-lg hover:bg-hoverColor dark:hover:bg-slate-800 cursor-pointer' onClick={() => loadPrompt(item.content)}>
                    <div className='p-4 flex flex-col gap-10'>
                        <p>{item.content}</p>
                        <div className='icon flex flex-row justify-between'>
                            <div></div>
                            <div className='bg-white dark:bg-neutral-900 rounded-full p-3'>
                                <p>{item.icon}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))
              }
               <div className=' p-4  flex-col  gap-10  hidden sm:flex'>
               <p></p>
               <div className='icon flex flex-row justify-between '>
               <div></div>
               <div className=' bg-white rounded-full p-3 relative dark:bg-neutral-900'>
                   <p > </p></div>
               </div></div>

        </div></>
           
                   :<>
        
                   <div className=' Result  sm:scroll-bar overflow-y-scroll'>
                    <div className=' Top Bar flex flex-col gap-4' >
                        <div className='user-input flex flex-row gap-2  items-center'> <Image src="/user_icon.png" alt="user-icon"
         width={40} height={40} className=' rounded-full    '/>
         <p className=' font-sans text-lg font-medium'>{recentPrompt}</p>

         </div>
                          <div className=' user-output flex flex-row gap-2 '>
                          <Image src="/gemini_icon.png" alt="gemini-icon"
         width={40} height={40} className='  max-w-10   max-h-10'/>
         { loading?
         <div className=' loader w-full flex flex-col gap-4'>
            <hr className='loading-bar'></hr>
            <hr className='loading-bar'></hr>
            <hr className='loading-bar'></hr>
            </div>:<>
         <p className=' text-lg  font-sans' dangerouslySetInnerHTML={{ __html: resultData }}></p>
            </>}
        
                          </div>
                    </div>
                              
                   </div></>
                   
        }
                
                    
                     {/* Bottom-part */}
                     <div className= { clsx(showResult?' fixed bottom-2  mr-3 sm:mr-0  min-w-fit  w-9/12':'flex  flex-col   w-full   items-center gap-3 lg:gap-6',Icon ? '-z-10' :' z-0')}>
                     <div className= {clsx('bottom-box  min-w-fit w-full bg-cardColor  dark:bg-blackbg  rounded-3xl',showResult?' relative bottom-3' :' bottom-0')}>
                        <div className='input-box flex flex-row justify-between items-center  px-5  py-3 sm:p-5'>
                        <input  onChange={(e)=>setInput(e.target.value)}  onKeyDown={handleKeyDown}
                         value={input} type='text'  className=' flex-1 border-none outline-none bg-transparent text-sm sm:text-lg  px-0 sm:px-5'placeholder='Enter a prompt here ...'></input>
                        <div className=' flex flex-row  gap-2 sm:gap-4 items-center'>
                            <span className=' cursor-pointer'>{ ImgPlusIcon}</span>
                            <span className=' cursor-pointer'>{MicIcon}</span>
                             <button className={clsx('cursor-pointer', input.trim() ? 'enabled-class' : 'disabled-class')}
                                onClick={onSent} disabled={!input.trim()}>
                                {SendIcon}
                            </button>
                           
                        </div>
                        </div>
                     </div>
                     <p  className='  flex flex-row text-sm items-center justify-center gap-2'><span>{VercelIcon}</span><span>Gemini may display inaccurate info,including about people,so double-check its responses.Your privacy and Gemini Apps</span>
                     </p>
                     </div>
        </div>

      </div>
        </div>
      
    </div>
  )
}

export default Main
