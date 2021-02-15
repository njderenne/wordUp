const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        friends: [User]
    }

    type Message {
        _id: ID
        messageText: String
        createdAt: String
        email: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user: User
        users: [User]
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        addMessage(messageText: String!): Message
    }
`;

module.exports = typeDefs;