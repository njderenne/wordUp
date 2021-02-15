import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Login from './pages/Login';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: 'http://localhost:3001/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Login> </Login>
      </Router>
    </ApolloProvider>
  );
}

export default App;
