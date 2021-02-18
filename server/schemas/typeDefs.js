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
        sender: String
    }

    type Channel {
        _id: ID
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
        user: User
        users: [User]
        channels: [Channel]
        channel: Channel
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        removeFriend(friendId: ID!): User
        addMessage(messageText: String!, channelId: ID!): Channel
        deleteMessage(messageId: ID!, channelId: ID!): Channel
        addChannel(name: String!): Channel
        removeChannel(channelId: ID!): Channel
        addParticipant(channelId: ID!, participants: ID!): Channel
        removeParticipant(channelId: ID!, participants: ID!): Channel
        changeChannelName(name: String!, channelId: ID!): Channel
    }

    type Subscription {
        messageAdded: Channel
        channelAdded: Channel
    }
`;

module.exports = typeDefs;