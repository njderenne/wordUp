import gql from 'graphql-tag';

export const QUERY_ME = gql`
    {
        me {
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

export const QUERY_USER = gql`
    query {
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

export const QUERY_CHANNELS = gql`
    query {
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
    query channel ($channelId: ID!) {
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
