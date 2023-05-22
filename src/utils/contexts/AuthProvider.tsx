import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

import { googleLogout } from '@react-oauth/google';
import { Loading } from "../../components/wait/Loading";
import { toast } from "react-toastify";
import { string } from "zod";
import { AUTH_COOKIE, GOOGLE_AUTH_COOKIE, decodeCookie, deleteCookie, getCookie, setCookie } from "../cookies";
import { api } from "../services/api";

interface IUser {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}
interface AuthProps {
  authenticated: boolean;
  user: IUser,
  loading: boolean;
  login: ({email, password}: { email: string, password: string }) => void;
  logoutGoogleAuth: () => void;
  logout: () => void;
  handleAccessTokenGoogleAuth: (accessToken: string) => void;
}

const initialValues: AuthProps = {
  authenticated: false,
  user: {
    id: "",
    name: "",
    email: "",
    photoUrl: "",
  },
  loading: true,
  login: ({email, password}: { email: string, password: string }) => {},
  logoutGoogleAuth: () => {},
  logout: () => {},
  handleAccessTokenGoogleAuth: (accessToken: string) => {},
};

export const AuthContext = createContext(initialValues);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser>(initialValues.user); 

  
  useEffect(() => {
    setLoading(true)
    
    const cookie = getCookie(AUTH_COOKIE);

    if (cookie) {
      api.defaults.headers.common["authorization"] = `Bearer ${cookie}`;
      getUser()
    }

    const googleCookie = getCookie(GOOGLE_AUTH_COOKIE);
    
    if (googleCookie && googleCookie !== "") {
      handleAccessTokenGoogleAuth(googleCookie)
    }

    setLoading(false)
  }, [authenticated])

  async function getUser() {
    setLoading(true)

    await api
      .get("user")
      .then(({data}) => {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          photoUrl: data.photo ? data.photo : "",
        })
        setAuthenticated(true);
      }).catch((err) => {
        if (err.response.data.message)
          toast(err.response.data.message, {type: "error"})
        console.error({err})
        logout()
      }).finally(() => {
        return setLoading(false)
      })
  }
  
  async function handleAccessTokenGoogleAuth(token: string) {
    setLoading(true)
    setCookie(GOOGLE_AUTH_COOKIE, token)
    
    await api
    .post("/user/google", {accessToken: token})
      .then(({data}) => {
        setUser({
          email: data.emailAddresses[0].value,
          name: data.names[0].displayName,
          photoUrl: data.photos[0].url,
          id: data.resourceName,
        })
      })
      .catch((error) => {
        logoutGoogleAuth()
        console.log({error});
      })
      setLoading(false)
      setAuthenticated(true)
  }
    
  function logout() {
    setAuthenticated(false);
    setUser(initialValues.user);
    deleteCookie(AUTH_COOKIE);
    api.defaults.headers.common["authorization"] = "";
  }

  function logoutGoogleAuth() {
    setAuthenticated(false);
    setUser(initialValues.user);
    deleteCookie(GOOGLE_AUTH_COOKIE)
    api.defaults.headers.common["authorization"] = "";
    googleLogout();
  }

  async function login({email, password}: { email: string, password: string}) {
    setLoading(true)
    await api
      .post("/user/login", {email, password})
      .then(async (s) => {
        toast("Login realizado com sucesso", {type: "success"})
        const token = s.data.token;
        api.defaults.headers.common["authorization"] = `Bearer ${token}`;
        setCookie(AUTH_COOKIE, token)
        getUser()
      })
      .catch((err):any => {
        console.error(err)
        if (err.response?.data?.message === typeof string) {
          toast(err.response.data.message, {type: "error"})
        } else {
          toast("Ops... Um erro inesperado aconteceu. Tente novamente mais tarde", {type: "error"})
          toast(JSON.stringify(err.response.data.message), {type: "error"})
        }
      })
      .finally(() => setLoading(false))
  }
  
  if (loading && !authenticated) <>
    return <Loading />
  </>

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          authenticated,
          user,
          loading,
          login,
          logoutGoogleAuth,
          logout,
          handleAccessTokenGoogleAuth,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};
