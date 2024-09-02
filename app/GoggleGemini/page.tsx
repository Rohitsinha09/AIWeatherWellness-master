// import ContextProvider from "../GeminiContext/Context"
// import { NextPage } from 'next'
// import React from 'react'
// import Main from './Components/Main/Main'
// const GeminiPage :NextPage = ()=>{
//    return(
//       <ContextProvider>
//      <Main/>
//      </ContextProvider>
//    )
// }

// export default GeminiPage;
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import React from 'react';
const ContextProvider = dynamic(() => import('../GeminiContext/Context'), {
  ssr: false, // Disable SSR if the context doesn't need to be server-side rendered
});
const Main = dynamic(() => import('./Components/Main/Main'), {
  ssr: false, // Disable SSR if the context doesn't need to be server-side rendered
});


const GeminiPage: NextPage = () => {
  return (
    <ContextProvider>
      <Main />
    </ContextProvider>
  );
};

export default GeminiPage;
