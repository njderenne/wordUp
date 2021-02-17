import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
            }
        }
    }
    `;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            token
            user{
                _id
            }
        }
    }
    `;

export const ADD_MESSAGE = gql`
    mutation addMessage($channelId: String, $messageText: String) {
        addMessage(channelId: $channelId, messageText: $messageText) {
            _id
            name
            createdBy
            createdAt
            participants {
                _id
            }
            messages {
            messageText
            }
        }
    }
    `;

export const ADD_CHANNEL = gql` 
    mutation addChannel($name: String!) {
        addChannel(name:$name) {
        _id
        name
        createdBy
        participants {
            _id
        }
        }
    }
    `;

export const ADD_FRIEND = gql` 
    mutation addFriend($id: ID!) {
        addFriend(friendId:$id) {
            firstName
        }
    }
    `;

export const ADD_PARTICIPANT = gql` 
    mutation addParticipant($channelId: ID, $participants: ID) {
        addParticipant(channelId: $channelId, participants: $participants) {
            _id
            name
            createdBy
            participants {
                _id
            }
        }
    }
    `;
