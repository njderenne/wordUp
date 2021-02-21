import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split, ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';


// import { ApolloLink } from 'apollo-link';
// import { ApolloProvider } from '@apollo/react-hooks';
//import ApolloClient from 'apollo-boost';
// import { HttpLink } from 'apollo-link-http';
//import { InMemoryCache } from 'apollo-cache-inmemory';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import { ChannelProvider } from "./utils/GlobalState";
import Auth from "./utils/auth";

if(Auth.loggedIn) {
  console.log(Auth.getProfile());
  console.log(localStorage.getItem('id_token'))
}

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  headers: {
    authorization: localStorage.getItem('id_token')
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('id_token')
    }
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([terminatingLink]);

// const cache = new InMemoryCache();


// const client = new ApolloClient({
//   request: (operation) => {
//     const token = localStorage.getItem('id_token')
//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ''
//       }
//     })
//   },
//   link,
//   cache,
// });


const client = new ApolloClient({
  // link,
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('id_token')
  }
})




function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ChannelProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </ChannelProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
