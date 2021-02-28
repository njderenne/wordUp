import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import { ChannelProvider } from "./utils/GlobalState";

const httpLink = new HttpLink({
  uri: '/graphql',
  headers: {
    authorization: localStorage.getItem('id_token')
  }
});

// const deployedSite = 'ws://fast-shelf-56121.herokuapp.com/graphql'
// const HOST = location.origin.replace(/^http/, 'ws')

const wsLink = new WebSocketLink({
  uri: 'wss://fast-shelf-56121.herokuapp.com/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authorization: `Bearer ${localStorage.getItem('id_token')}`
    }
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        channels: {
          merge(existing, incoming){
            return incoming
          }
        },
      },
    },
  },
});


const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache,
  headers: {
    authorization: localStorage.getItem('id_token')
  },
  link
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