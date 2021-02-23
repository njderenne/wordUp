import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
    subscription messageAdded($channelId: ID) {
        messageAdded(channelId: $channelId) {  	
            _id
            messages {
                _id
                messageText
            }
        }
    }
`;

export const CHANNEL_SUBSCRIPTION = gql `
    subscription channelAdded($userId: ID) {
        channelAdded(userId: $userId) {
            _id
            channels {
                _id
            }
        }
    }
`;