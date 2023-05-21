import { MapTrifold, X } from "phosphor-react";
import React, { useState } from "react";
import GoogleMaps from "../maps/GoogleMaps";

const MapFloat: React.FC = () => {
  const [toggleMap, setToggleMap] = useState<boolean>(false);

  function handleToggleMap() {
    setToggleMap((prev) => !prev);
  }

  return (
    <React.Fragment>
      {toggleMap && (
        <div
          className={`p-4 backdrop-brightness-75 fixed transition-all duration-500
        bottom-0 right-0 w-screen h-screen overflow-hidden 
          `}
        >
          <div
            className={` flex-1 h-[calc(100vh-7.5rem)] rounded border-2 border-zinc-300 p-1 transition-all duration-300`}
          >
            <GoogleMaps />
          </div>
        </div>
      )}

      <button
        onClick={handleToggleMap}
        className="fixed bottom-8 rounded-full right-4 p-3 bg-blue-500 hover:bg-blue-500/95 text-zinc-50 hover:scale-[1.025] transition-all active:bg-blue-600 shadow-lg"
      >
        {toggleMap ? <X size={32} /> : <MapTrifold size={32} />}
      </button>
    </React.Fragment>
  );
};

export default MapFloat;
