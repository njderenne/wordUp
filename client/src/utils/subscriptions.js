import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
    subscription OnMessageAdded($channelId: ID) {
        messageAdded(channelId: $channelId) {  	
            _id
            messages {
                _id
                messageText
            }
        }
    }
`;