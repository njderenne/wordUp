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
        _id: String
        messageText: String
        createdAt: String
        email: String
    }

    type Channel {
        _id: String
        name: String
        createdAt: String
        createdBy: String
        participants: [User]
        messages: [Message]
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(email: String): User
        users: [User]
        channels: [Channel]
        channel: Channel
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        addMessage(messageText: String, channelId: String): Channel
        addChannel(name: String!): Channel
        addParticipant(_id: String, participants: ID): Channel
        changeChannelName(name: String, channelId: String): Channel
    }
`;

module.exports = typeDefs;