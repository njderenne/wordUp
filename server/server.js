const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const { makeExecutableSchema } = require('graphql-tools');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
});


const PORT = process.env.PORT || 3001;
const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

apolloServer.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("/service-worker.js", (req,res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'serviceWorker.js'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const ws = createServer(app);

db.once('open', () => {
  ws.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema: schema, 
    }, {
    server: ws,
    path: '/graphql',
    });
    console.log(`Listening on PORT ${PORT}`);
    console.log(`Accessable through http://localhost:${PORT}/graphql`)
  });
});
