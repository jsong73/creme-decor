import React from "react"
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Orderhistory from "./pages/OrderHistory";
import Signup from "./pages/Signup";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={ <Home />}/>

              <Route path="/login" element={ <Login />}/>

              <Route path="/signup" element={ <Signup />}/>

              <Route path="/orderhistory" element={ <Orderhistory />}/>

              <Route path="/products/:id" element={ <Detail />}/>
              
              <Route path="*" element={ <NoMatch />}/>

            </Routes>
          </div>
        </Router>
    </ApolloProvider>
  );
}

export default App;
