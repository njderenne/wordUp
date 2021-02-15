const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        friends: [User]
        channels: [Channel]
    }

    type Message {
        _id: ID
        messageText: String
        createdAt: String
        email: String
    }

    type Channel {
        _id: ID!
        name: String
        createdAt: String
        createdBy: [User]
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user: User
        users: [User]
        channels: [Channel]
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        addMessage(messageText: String!): Message
    }
`;

module.exports = typeDefs;