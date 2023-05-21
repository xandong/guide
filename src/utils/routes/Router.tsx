import React, { Suspense, useContext, useEffect } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthContext } from "../contexts/AuthProvider";
import { Loading } from "../../components/wait/Loading";
import routes from "./RoutesList";

export const Router: React.FC = () => {

  return (
    <Routes>
      {routes.map(({ guarded, component: Page, path }) => (
        <Route
          key={path}
          path={path}
          element={
            guarded ? <PrivateRoute>{<Page/>}</PrivateRoute> :
            <Suspense fallback={<Loading />}>
              <Page />
            </Suspense>
          }
        />
      ))}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { authenticated, loading } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;

    if (!authenticated && path !== "/login") {
      navigate("/login", { replace: true });
    } else if (authenticated && path === "/login") {
      navigate("/");
    }
  }, [authenticated, navigate]);

  if (!authenticated && loading) return <Loading />

  return <>
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  </>
};

export default Router;