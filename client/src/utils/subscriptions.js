import gql from 'graphql-tag';

export const MESSAGE_SUBSCRIPTION = gql`
    subscription messageAdded($channelId: ID) {
        messageAdded(channelId: $channelId) {  	
            _id
            messages {
                _id
                messageText
                firstName
                lastName
            }
        }
    }
`;