import React from "react";
import ReactDOM from "react-dom/client";
import Error from "./pages/Error";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles/base.css";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

//const BASE_URL = "http://13.51.109.101:8080/";
const BASE_URL = "http://localhost:8080";
const AUTH0_DOMAIN = "dev-jpbmpfwsmkps2emf.us.auth0.com ";
const AUTH0_CLIENT_ID = "aPibfjOqLPYSnvH9TtJqMkxR8xrj94ZB";
// const BASE_URL = "https://hampuslundblad.com";
const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </ApolloProvider>
  </React.StrictMode>
);
