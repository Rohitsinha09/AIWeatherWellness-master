"use client"
import run from "../config/gemini";
import { createContext, useState, useContext } from "react";

const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  
  const loadPrompt = async (prompt) => {
    if (prompt) {
      setRecentPrompt(prompt);
      await onSent(prompt);
    }
  };
  const delayText = (index, nextWord) => {
    setTimeout(function () {
        setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const Newchat=()=>{
    setLoading(false);
    setShowResult(false);
  }
  const onSent = async (prompt) => {
    if (!prompt && !input.trim()) {
      return;
    }
   
    setResultData(""); // startData null
    setLoading(true);
    setShowResult(true); // result
    let data = "";

    if (prompt) {
      data = await run(prompt);
    } else {
      setRecentPrompt(input);
      data = await run(input);
    }

    setPrevPrompt((prev) => [...prev, input].filter(Boolean));

    let responseArray = data.split("**");
    let newResponse = ""; // Initialize as an empty string
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayText(i, nextWord + " ");
    }
    setLoading(false);

    setInput("");
  };
 
  const ContextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    Newchat,
    loadPrompt,
   
    

  };

  return <Context.Provider value={ContextValue}>{props.children}</Context.Provider>;
};

export const geminiContext = () => useContext(Context);

export default ContextProvider;
