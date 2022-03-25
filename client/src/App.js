import "./App.scss"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";import * as reactRouterDom from "react-router-dom";

import EmailPassword, {redirectToAuth} from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

import axios from "axios";
import {useState} from "react";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import CallAPIView from "./pages/callApiView/CallAPIView";
Session.addAxiosInterceptors(axios);

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 4000;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    recipeList: [
        EmailPassword.init({
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
        }),
        Session.init(),
    ],
});

function SessionExpiredPopup() {
    alert( 'Your session has expired' );
    return null;
}

function App() {

    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

  return (
      <div>
      <BrowserRouter>

          <div className="navbar">
              <div className="navElement">
                  <Link to="/">
                      <span className="logo">home</span>
                  </Link>
              </div>
              <EmailPassword.EmailPasswordAuth children={<Navbar/>}/>
              <div className="navElement">
                  <button onClick={async () => { redirectToAuth() }}>Login</button>
              </div>
          </div>

          <Routes>
            {/* This shows the login UI on "/auth" route */}
            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
            <Route path="/">
                <Route index element={<Home/>}/>
                <Route path="users">
                    <Route index element={
                        <EmailPassword.EmailPasswordAuth
                            onSessionExpired={() => { updateShowSessionExpiredPopup(true); }}>
                            <Users/>
                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                        </EmailPassword.EmailPasswordAuth>
                    }/>
                    <Route path=":userId" element={
                        <EmailPassword.EmailPasswordAuth
                            onSessionExpired={() => { updateShowSessionExpiredPopup(true); }}>
                            <User/>
                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                        </EmailPassword.EmailPasswordAuth>
                    }/>
                </Route>
                <Route path="callApiView" element={
                    <EmailPassword.EmailPasswordAuth
                        onSessionExpired={() => { updateShowSessionExpiredPopup(true); }}>
                        <CallAPIView/>
                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                    </EmailPassword.EmailPasswordAuth>
                }/>
            </Route>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
