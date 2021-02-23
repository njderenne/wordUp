import { gql } from '@apollo/client';

// export const QUERY_ME = gql`
//     {
//         me {
//             _id
//             firstName
//             lastName
//             email
//             friends{
//                 _id
//                 firstName
//                 lastName
//             }
//             channels{
//                 _id
//                 name
//                 participants{
//                     _id
//                     firstName
//                     lastName
//                 }
//                 messages{
//                     _id
//                     messageText
//                     createdAt
//                     email
//                 }
//             }
//         }
//     }
// `;

export const QUERY_USER = gql`
    query GetUser{
        user {
            _id
            firstName
            lastName
            email
            friends{
                _id
                firstName
                lastName
            }
            channels{
                _id
                name
                participants{
                    _id
                    firstName
                    lastName
                }
                messages{
                    _id
                    messageText
                    createdAt
                    email
                }
            }
        }
    }
`;

export const QUERY_USERS = gql`
    query GetUser ($userEmail: email!) {
        user(userEmail: $userEmail) {
            _id
            firstName
            lastName
            email
        }
    }
`

export const QUERY_CHANNELS = gql`
    query GetChannels{
        channels {
            _id
            name
            participants{
                _id 
                firstName
                lastName
            }
            messages{
                _id
                messageText
                createdAt
                email
            }
            
        }
    }            
`;

export const QUERY_CHANNEL = gql`
    query GetChannel ($channelId: ID!) {
        channel(channelId: $channelId) {
            _id
            name
            participants{
                _id 
                firstName
                lastName
            }
            messages{
                _id
                messageText
                createdAt
                email
            }
            
        }
    }            
`;
