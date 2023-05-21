import React, { useContext, useEffect } from "react"
import { Button, Chip, Divider, Typography } from "@mui/material";

import { WrapperFull } from "../../components/Layout/WrapperFull"
import { LoginForm } from "../../components/auth/LoginForm";
import { GoogleLogin } from "../../components/auth/GoogleLogin";
import { AuthContext } from "../../utils/contexts/AuthProvider";
import { Redirect } from "../../components/wait/Redirect";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  document.title = "Login";
  const navigate = useNavigate()
  const { authenticated } = useContext(AuthContext);
  useEffect(() => {
    if (authenticated) {
      setTimeout(() => {
        navigate("/")
      }, 500);
    }
  }, [authenticated]);

  return (
    <React.Fragment>
      {
        !authenticated ?
        <WrapperFull>
          {/* <div className="absolute top-2 right-4 flex items-center gap-2">
            <span className="sm:block hidden text-xs text-blue-400 font-semibold">Não possui uma conta?</span>
            
            <Link to="/register">
            <Button variant="contained">Cadastrar</Button>
            </Link>
          </div> */}

          <img src="/guide-logo.svg" className="mb-6"/>
          <h1
          className="text-3xl font-bold text-blue-500 mb-10"
          >Acesse sua conta</h1>
          <LoginForm />

          <Link to="/register" className="w-[360px] flex justify-start p-2">
            <span className="text-xs text-blue-400 font-semibold">Não possui uma conta? Clique aqui!</span>
          </Link>

          <div className="w-[320px] mt-3 flex flex-col items-center">
            <Divider variant='middle'>
              <Chip label="OU" />
            </Divider>

            <label htmlFor="buttonGoogleAuth" className="w-fit flex gap-4 justify-center items-center p-2 rounded-full border-2 border-zinc-200">
              <GoogleLogin />
              <span className="font-semibold text-sm text-zinc-400">
                Entrar com o Google
              </span>
            </label>
          </div>
        </WrapperFull>
        : <Redirect />
      }
    </React.Fragment>
  )
}

export default Login;