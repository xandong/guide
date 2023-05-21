import React from "react"

import { WrapperFull } from "../../components/Layout/WrapperFull"
import { RegisterForm } from "../../components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Register: React.FC = () => {
  document.title = "Register";

  return (
    <React.Fragment>
      <WrapperFull>
        {/* <div className="absolute top-2 right-4 flex items-center gap-2">
          <span className="sm:block hidden text-xs text-blue-400 font-semibold">Possui uma conta?</span>
          
          <Link to="/login">
          <Button variant="contained">Entrar</Button>
          </Link>
        </div> */}

          <img src="/guide-logo.svg" className="mb-6"/>
          <h1
          className="text-3xl font-bold text-blue-500 mb-10"
          >Crie sua conta</h1>
          <RegisterForm />   

          <Link to="/login" className="w-[360px] flex justify-start p-2">
            <span className="text-xs text-blue-400 font-semibold">Possui uma conta? Clique aqui!</span>
          </Link>     
        </WrapperFull>
    </React.Fragment>
  )
}

export default Register;