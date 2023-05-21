import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./utils/routes/Router";
import { LocationProvider } from "./utils/contexts/Location";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./utils/contexts/AuthProvider";
import { ToastContainer } from "react-toastify";

const CLIENT_ID = import.meta.env!.VITE_ID_CLIENT_GOOGLE

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        />
        <BrowserRouter>
          <AuthProvider>
            <LocationProvider>
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <Router />
              </GoogleOAuthProvider>
            </LocationProvider>
          </AuthProvider>
        </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
