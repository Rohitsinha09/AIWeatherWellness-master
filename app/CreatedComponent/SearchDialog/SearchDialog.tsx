
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/ContextApi/GlobalContext";
import { commandIcon } from "@/app/utils/Icons";
import { CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose, // Import DialogClose component
} from "@/components/ui/dialog";
import { CommandList } from "cmdk";
import { CommandIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

function SearchDialog() {
  const { geoCodedList, handleKeyDown,setInputValue,inputValue, handleInput,zipCodeCity } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [textIndex, setTextIndex] = React.useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);
  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
    // Close the dialog after setting the coordinates
    closeDialog();
    setInputValue("");
  };
const texts = ["Search Here ... (Zip-code)", "Search Here ... (City-name)"];

useEffect(() => {
  const interval = setInterval(() => {
    setTextIndex((prevIndex:number) => (prevIndex + 1) % texts.length);
  }, 6500);

  return () => {
    clearInterval(interval);
  };
}, []); 
  // Function to close the dialog programmatically
  const closeDialog = () => {
    const closeButton = document.getElementById("dialog-close-button");

    if (closeButton) closeButton.click();
  };

  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200  overflow-hidden"
          >
            <div className=" flex items-center justify-center  gap-3 sm:gap-0 sm:justify-between w-full">
            <p className="text-sm text-muted-foreground animate-bounces">  {texts[textIndex]}</p>
            <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm sm:ml-[10rem] flex items-center gap-2 ">
              {commandIcon}
              <span className="text-[9px]">F</span>
            </div>
            </div>
           
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0 content1">
          <Command className=" rounded-lg border shadow-md ">
            <CommandInput 
              value={inputValue}
              onChangeCapture={handleInput}
              onKeyDownCapture={handleKeyDown}
              placeholder="Type a command or search..."
            />
            <CommandList>
              <ul className="px-3 pb-2">
                <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

                {geoCodedList?.length === 0 ||
                (!geoCodedList && <p>No Results</p>)}


                {geoCodedList && Array.isArray(geoCodedList) && geoCodedList.length > 0 ? (
                  geoCodedList.map((item, index) => {
                    const { country, state, name } = item;
                    return (
                      <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm rounded-sm cursor-default ${
                          hoveredIndex === index ? "bg-accent" : ""
                        }`}
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                        }}
                      >
                        <p className="text">
                          {name}, {state && state + ","} {country}
                        </p>
                      </li>
                    );
                  })
                ) : (
                  <p>No Results</p>
                )}
              </ul>
           
            </CommandList>
            <CommandList>
            <p className="p-2 text-sm text-muted-foreground">Zip-Code City Suggestions</p>
            {zipCodeCity ? (
              <ul className="px-3 pb-2">
                  <li>{zipCodeCity}, {"IN"}</li>
                  </ul>
                ) : (
                  <p className=" p-3 text-sm font-medium ">No Results</p>
                )}
            </CommandList>
          </Command>
        </DialogContent>
        {/* DialogClose component with an ID to access it programmatically */}
        <DialogClose id="dialog-close-button" />
      </Dialog>
    </div>
  );
}

export default SearchDialog;




 