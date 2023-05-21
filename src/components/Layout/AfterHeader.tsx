import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "phosphor-react";

import { LocationContext } from "../../utils/contexts/Location";
import DialogTransition from "../dialog/DialogTransition";

const AfterHeader: React.FC = () => {
  const { name } = useContext(LocationContext)
  const navigate = useNavigate()

  function handleGoToCheckIn() {
    return navigate("/check-in");
  }

  return (
    <React.Fragment>
      <div className="w-[100%] border-b rounded-b-lg shadow flex justify-between items-center sm:px-10 px-6 py-1.5 bg-zinc-800 text-white text-sm font-medium">      
        <div className="flex items-center gap-1">
          <MapPin size={16} weight="fill" />
          {
            name ?
            (
              <DialogTransition
                titleAction={`${name} - CE`}
                titleDialog="Deseja mudar o destino turístico?"
                handleSuccess={handleGoToCheckIn}
              />
            ) : (
              <Link to="/check-in" className="font-semibold text-xs text-zinc-100 uppercase">Selecionar Destino</ Link>
            )
          }
        </div>

        {/* <div>32&deg; - Maré baixa</div> */}
      </div>
    </React.Fragment>
  );
};

export default AfterHeader;
