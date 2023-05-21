import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LocationProps {
  name: string;
  setName: (name: string) => void;
}

const initialValues: LocationProps = {
  name: "",
  setName: (name: string) => {}
};

export const LocationContext = createContext(initialValues);

interface LocationProviderProps {
  children: React.ReactNode;
}
export const LocationProvider: React.FC<LocationProviderProps> = (props) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if (name === "" ) return navigate("/check-in");
  }, [name])

  return (
    <React.Fragment>
      <LocationContext.Provider 
      value={{
        name,
        setName
      }}>
      {props.children}
      </LocationContext.Provider>
    </React.Fragment>
    )
}