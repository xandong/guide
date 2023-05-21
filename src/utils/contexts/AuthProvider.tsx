import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  username: string;
  email: string;
  photoUrl: string;
}
interface AuthProps {
  authenticated: boolean;
  accessTokenGoogleAuth: string;
  user: IUser,
  loading: boolean;
  login: ({email, password}: { email: string, password: string }) => void;
  logoutGoogleAuth: () => void;
  handleAccessTokenGoogleAuth: (accessToken: string) => void;
}

const initialValues: AuthProps = {
  authenticated: false,
  accessTokenGoogleAuth: "",
  user: {
    id: "",
    name: "",
    username: "",
    email: "",
    photoUrl: "",
  },
  loading: true,
  login: ({email, password}: { email: string, password: string }) => {},
  logoutGoogleAuth: () => {},
  handleAccessTokenGoogleAuth: (accessToken: string) => {},
};

export const AuthContext = createContext(initialValues);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [accessTokenGoogleAuth, setAccessTokenGoogleAuth] = useState("");
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser>(initialValues.user); 
  
  useEffect(() => {
    setLoading(true)

    const cookie = getCookie(AUTH_COOKIE);

    if (cookie) {
      (async () => {
        api.defaults.headers.common["authorization"] = `Bearer ${cookie}`;
        await api.get("user").then(({data}) => {
          setUser({
            id: data.id,
            name: data.name,
            username: data.username,
            email: data.email,
            photoUrl: data.photo ? data.photo : "",
          })
          setAuthenticated(true)
        }).catch((err) => {
          console.error({err})
          logout()
        })
      })()
    }

    const googleCookie = getCookie(GOOGLE_AUTH_COOKIE);

    if (googleCookie) {
      setAuthenticated(true)
    }

    setLoading(false)
  }, [authenticated])
  
  function handleAccessTokenGoogleAuth(token: string) {
    setLoading(true)
    setCookie(GOOGLE_AUTH_COOKIE, token)
    setAuthenticated(true);

    const apiKey = `${import.meta.env.VITE_KEY_CLIENT_GOOGLE}`;

    const url = `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos&key=${apiKey}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessTokenGoogleAuth}`,
        },
      })
      .then((response) => {
        console.info({ user: response.data });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }

  function logout() {
    setAuthenticated(false);
    setUser(initialValues.user);
    deleteCookie(AUTH_COOKIE);
    api.defaults.headers.common["authorization"] = "";
  }

  function logoutGoogleAuth() {
    logout();
    googleLogout();
    setAccessTokenGoogleAuth("");
    deleteCookie(GOOGLE_AUTH_COOKIE)
  }

  async function login({email, password}: { email: string, password: string}) {
    setLoading(true)
    await api
      .post("user/login", {email, password})
      .then(async (s) => {
        toast("Login realizado com sucesso", {type: "success"})
        const token = s.data.token;
        api.defaults.headers.common["authorization"] = `Bearer ${token}`;
        setCookie(AUTH_COOKIE, token)
        await api
          .get("user")
          .then(({data}) => {
            setUser({
              id: data.id,
              name: data.name,
              username: data.username,
              email: data.email,
              photoUrl: data.photo ? data.photo : "",
            })
            setAuthenticated(true);
          }).catch((err) => {
            if (err.response.data.message)
              toast(err.response.data.message, {type: "error"})
            console.error({err})
            logout()
         })
      })
      .catch((err):any => {
        console.error(err)
        if (err.response?.data?.message === typeof string) {
          toast(err.response.data.message, {type: "error"})
        } else {
          toast("Ops... Um erro inesperado aconteceu. Tente novamente mais tarde", {type: "error"})
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
          accessTokenGoogleAuth,
          user,
          loading,
          login,
          logoutGoogleAuth,
          handleAccessTokenGoogleAuth,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};
