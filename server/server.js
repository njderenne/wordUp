const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// const { createServer } = require('http');
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




































// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const path = require('path');
// // const { createServer } = require('http');
// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');
// const db = require('./config/connection');
// const { SubscriptionServer } = require('subscriptions-transport-ws');

// const PORT = process.env.PORT || 3001;
// const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   subscriptions: {
//       //is path required to be '/subscriptions'?
//       path: '/subscriptions',
//       onConnect: (connectionParams, webSocket, context) => {
//           console.log('Client connected');
//       },
//       onDisconnect: (webSocket, context) => {
//           console.log('Client disconnected')
//       },
//   },
//   context: authMiddleware
// });

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });



























// const ws = new ApolloServer({
//     typeDefs,
//     resolvers,
//     subscriptions: {
//         //is path required to be '/subscriptions'?
//         path: '/subscriptions',
//         onConnect: (connectionParams, webSocket, context) => {
//             console.log('Client connected');
//         },
//         onDisconnect: (webSocket, context) => {
//             console.log('Client disconnected')
//         },
//     },
//     context: authMiddleware
// });



// ws.listen(PORT, () => {
//     console.log('this probably isnt working');
// })







// const express = require('express');
// const cors = require('cors');
// const { execute, subscribe } = require('graphql');
// const { createServer } = require('http');
// const { SubscriptionServer } = require('subscriptions-transport-ws');

// // import { schema } from './src/schema';
// const { typeDefs, resolvers } = require('./schemas');

// const PORT = process.env.PORT || 3001;
// const server = express();

// server.use('*', cors({ origin: `http://localhost:${PORT}` }));

// server.use('/graphql', bodyParser.json(), graphqlExpress({
//   typeDefs,
//   resolvers
// }));

// server.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
// }));

// // Wrap the Express server
// const ws = createServer(server);
// ws.listen(PORT, () => {
//   console.log(`Apollo Server is now running on http://localhost:${PORT}`);
//   // Set up the WebSocket for handling GraphQL subscriptions
//   new SubscriptionServer({
//     execute,
//     subscribe,
//     schema
//   }, {
//     server: ws,
//     path: '/subscriptions',
//   });
// });




// const { ApolloServer } = require('apollo-server-express');
// const path = require('path');
// const { authMiddleware } = require('./utils/auth');
// const db = require('./config/connection');
// const express = require('express');
// const { execute, subscribe } = require('graphql');
// const { createServer } = require('http');
// const { SubscriptionServer } = require('subscriptions-transport-ws');
// const { typeDefs, resolvers } = require('./schemas');
// const PORT = process.env.PORT || 3001;
// // Create an express server.

// const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   subscriptions: {
//       //is path required to be '/subscriptions'?
//       path: '/subscriptions',
//       onConnect: (connectionParams, webSocket, context) => {
//           console.log('Client connected');
//       },
//       onDisconnect: (webSocket, context) => {
//           console.log('Client disconnected')
//       },
//   },
//   context: authMiddleware
// });

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// db.once('open', () => {
//     const ws = createServer(app);
//     ws.listen(PORT, () => {
//       console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
    
//       // Set up the WebSocket for handling GraphQL subscriptions.
//       new SubscriptionServer({
//         execute,
//         subscribe,
//         typeDefs,
//         resolvers
//       }, {
//         server: ws,
//         path: '/subscriptions',
//       });
//     });

// });


// Wrap the express server.

// server.use('/graphiql', graphiqlExpress({
//     endpointURL: '/graphql',
//     subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions` // subscriptions endpoint.
//   }));







// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const db = require('./config/connection');
// const { typeDefs, resolvers } = require('./schemas');
// const { makeExecutableSchema } = require('graphql-tools');
// const { authMiddleware } = require('./utils/auth');
// const schema = makeExecutableSchema({
//   typeDefs: typeDefs,
//   resolvers: resolvers,
//   auth: authMiddleware
// });

// const { execute, subscribe } = require('graphql');
// const { createServer } = require('http');
// const { SubscriptionServer } = require('subscriptions-transport-ws');

// const PORT = process.env.PORT || 3001;

// var app = express();


// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     graphiql: { subscriptionEndpoint: `ws://localhost:${PORT}/subscriptions` },
//   }),
// );

// const ws = createServer(app);

// db.once('open', () => {
//     ws.listen(PORT, () => {
//         // Set up the WebSocket for handling GraphQL subscriptions.
//         new SubscriptionServer(
//             {
//             execute,
//             subscribe,
//             schema,
//             },
//             {
//             server: ws,
//             path: '/subscriptions',
//             },
//         );
//     });
// });







// const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   subscriptions: {
//       //is path required to be '/subscriptions'?
//       path: '/subscriptions',
//       onConnect: (connectionParams, webSocket, context) => {
//           console.log('Client connected');
//       },
//       onDisconnect: (webSocket, context) => {
//           console.log('Client disconnected')
//       },
//   },
//   context: authMiddleware
// });

// server.applyMiddleware({ app });





















// -----------------------------------------------------------------------------------//



// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// // const db = require('./config/connection');
// const db = require('./config/connection');
// const { typeDefs, resolvers } = require('./schemas');
// const { makeExecutableSchema } = require('graphql-tools');
// const { authMiddleware } = require('./utils/auth');
// const schema = makeExecutableSchema({
//   typeDefs: typeDefs,
//   resolvers: resolvers,
// });
// const { PubSub } = require('graphql-subscriptions');
// const { execute, subscribe } = require('graphql');
// const { createServer } = require('http');
// const { SubscriptionServer } = require('subscriptions-transport-ws');

// const PORT = process.env.PORT || 3001;

// const app = express();

// // app.use('/graphql', bodyParser.json());

// const apolloServer = new ApolloServer({ 
//     schema,
//     context: authMiddleware });
// apolloServer.applyMiddleware({ app });

// const pubsub = new PubSub();
// const server = createServer(app);

// db.once('open', () => {
//     server.listen(PORT, () => {
//         new SubscriptionServer({
//             execute,
//             subscribe,
//             schema,
//         }, {
//         server: server,
//         path: '/subscriptions',
//         });
//     });
// });
























// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const db = require('./config/connection');
// const { typeDefs, resolvers } = require('./schemas');
// const { makeExecutableSchema } = require('graphql-tools');
// const { authMiddleware } = require('./utils/auth');
// const schema = makeExecutableSchema({
//   typeDefs: typeDefs,
//   resolvers: resolvers,
// });
// const { execute, subscribe } = require('graphql');
// const { createServer } = require('http');
// const { SubscriptionServer } = require('subscriptions-transport-ws');
// const PORT = process.env.PORT || 3001;
// var app = express();
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     graphiql: { subscriptionEndpoint: `ws://localhost:${PORT}/subscriptions` },
//   }),
// );
// const ws = createServer(app);
// db.once('open', () => {
//     ws.listen(PORT, () => {
//         // Set up the WebSocket for handling GraphQL subscriptions.
//         new SubscriptionServer(
//             {
//             execute,
//             subscribe,
//             schema,
//             },
//             {
//             server: ws,
//             path: '/subscriptions',
//             },
//         );
//     });
// });











// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const db = require('./config/connection');
// const { typeDefs, resolvers } = require('./schemas');
// const { makeExecutableSchema } = require('graphql-tools');
// const { authMiddleware } = require('./utils/auth');
// const schema = makeExecutableSchema({
//   typeDefs: typeDefs,
//   resolvers: resolvers,
//   auth: authMiddleware
// });

// const { execute, subscribe } = require('graphql');
// const { createServer } = require('http');
// const { SubscriptionServer } = require('subscriptions-transport-ws');

// const PORT = process.env.PORT || 3001;

// var app = express();


// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     graphiql: { subscriptionEndpoint: `ws://localhost:${PORT}/subscriptions` },
//   }),
// );

// const ws = createServer(app);

// db.once('open', () => {
//     ws.listen(PORT, () => {
//         // Set up the WebSocket for handling GraphQL subscriptions.
//         new SubscriptionServer(
//             {
//             execute,
//             subscribe,
//             schema,
//             },
//             {
//             server: ws,
//             path: '/subscriptions',
//             },
//         );
//     });
// });