import React , {useState, createContext} from "react";

export const StateContext = createContext ();

export const StateProvider = ({children}) => {
  const [eventId, setEventId] = useState ();

  return (
    <StateContext.Provider
      value={
        {setEventId,
        eventId
        }
      }
    >
      {children}
    </StateContext.Provider>
  )
}