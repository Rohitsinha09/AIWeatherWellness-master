"use client"
import React, { useState } from 'react';
import { HistoryIcon, MenuIcon, MessageIcon, PlusIcon, QuestionIcon, SettingIcon } from '@/app/utils/Icons';
import clsx from 'clsx';
import { useGlobalContext } from '@/app/ContextApi/GlobalContext';
import { geminiContext } from '@/app/GeminiContext/Context';

function Sidebar() {
  const [isMobileSideMenuOpen, setMobileSideMenuOpen] = useState(false);
  const [isMenuIconClicked, setMenuIcon] = useState(false);
  const { setIcon } = useGlobalContext();
  const { prevPrompt,Newchat,loadPrompt } = geminiContext();

  

  const handleMenuIconClick = () => {
    setMenuIcon((prevState) => !prevState);
  };

  return (
    <div className="MainSidebar h-full">
      {/* Mobile Screens */}
      <div className="Navbar sm:hidden pt-6 pl-3">
        <div
          className="Main Topbar cursor-pointer"
          onClick={() => {
            setMobileSideMenuOpen(true);
            setIcon(true);
          }}
        >
          {MenuIcon}
        </div>
        <div
          className={clsx(
            'fixed h-full w-screen lg:hidden top-0 right-0 left-0 -translate-x-full transition delay-150 ease-out duration-500',
            isMobileSideMenuOpen && 'translate-x-0'
          )}
        >
          <div className="h-full shadow-lg bg-zinc-100 max-w-80 border  dark:bg-blackbg  dark:shadow-none dark:border-slate-900">
            <div className="flex flex-col justify-between h-full p-3 pl-7">
              <div className="top flex flex-col gap-10 cursor-pointer">
                <button
                  onClick={() => {
                    setMobileSideMenuOpen(false);
                    setIcon(false);
                  }}
                  className="w-fit hover:bg-zinc-200 dark:hover:bg-zinc-700 p-3 rounded-sm"
                >
                  {MenuIcon}
                </button>

                <div className="Icon flex flex-row items-center bg-borderColor rounded-3xl max-w-40 py-2 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 cursor-pointer" onClick={()=>Newchat()}>
                  {PlusIcon}
                  <span className='animate-fadeIn'>New Chat</span>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-semibold animate-fadeIn">Recent</p>
                  {prevPrompt &&
                    prevPrompt.map((item:string, index:number) => (
                      <div 
                        key={index}
                        className="flex flex-row gap-2 pl-3 cursor-pointer animate-fadeIn"
                        onClick={() => loadPrompt(item)}
                      >
                        <span className="flex items-center gap-1">
                          {MessageIcon}
                          {item.slice(0, 18)}...
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-5 pb-5">
                <div className="flex flex-row gap-1 items-center">
                  {QuestionIcon}
                  <span className='animate-fadeIn'>Help</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  {HistoryIcon}
                  <span className='animate-fadeIn'>Activity</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  {SettingIcon}
                  <span className='animate-fadeIn'>Setting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large screens */}
      <div
        className={clsx(
          'sidebar h-full shadow-lg bg-zinc-100 hidden sm:block border  dark:bg-blackbg  dark:shadow-none dark:border-neutral-900  transition-all  duration-500',
          isMenuIconClicked ? 'min-w-64' : 'min-w-28 '
        )}
      >
        <div className="flex flex-col justify-between h-full pl-8 pt-3">
          <div className="top flex flex-col gap-10">
            <button
              onClick={handleMenuIconClick}
              className="w-fit hover:bg-zinc-200 dark:hover:bg-zinc-700 p-1 rounded-sm"
            >
              {MenuIcon}
            </button>
            <div onClick={()=>Newchat()}
              className={clsx(
                'Icon flex flex-row items-center bg-borderColor/75 rounded-3xl max-w-40 px-2 py-2 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 cursor-pointer',
                !isMenuIconClicked && 'w-14 rounded-full'
              )}
            >
              {PlusIcon}
              <span className={clsx(isMenuIconClicked ? 'block animate-fadeIn' : 'hidden')}>New Chat</span>
            </div>
            <div className={clsx(isMenuIconClicked ? 'flex flex-col gap-4' : 'hidden')}>
              <p className="font-semibold animate-fadeIn">Recent</p>
              {prevPrompt &&
                prevPrompt.map((item:string, index:number) => (
                  <div
                    key={index}
                    className="flex flex-row gap-2 pl-3 cursor-pointer animate-fadeIn"
                    onClick={() => loadPrompt(item)}
                  >
                    <span className="flex items-center gap-1">
                      {MessageIcon}
                      {item.slice(0, 18)}...
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 pb-10">
            <div className="flex flex-row gap-1 items-center">
              {QuestionIcon}
              <span className={clsx(isMenuIconClicked ? 'block animate-fadeIn' : 'hidden')}>Help</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              {HistoryIcon}
              <span className={clsx(isMenuIconClicked ? 'block animate-fadeIn' : 'hidden')}>Activity</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              {SettingIcon}
              <span className={clsx(isMenuIconClicked ? 'block  animate-fadeIn ' : 'hidden')}>Setting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
