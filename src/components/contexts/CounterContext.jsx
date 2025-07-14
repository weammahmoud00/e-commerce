import { useState } from 'react';  
import { createContext } from 'react';

export let CounterContext = createContext(0);

export default function countercontextprovider(props) {
  const[counter, setCounter]= useState(0)
    return <CounterContext.Provider value={{counter, setCounter}}>
        {props.children}
         {/* ///////  holds whole app  /////// */}
    </CounterContext.Provider>
}