import React from 'react';
import gql from 'graphql-tag';
import useSubscription from '@apollo/react-hooks';


const MESSAGE_SUBSCRIPTION = gql`
    subscription onMessageAdded($channelId: ID) {
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

 const SubTest= () => {
        const {data, error, loading } = useSubscription(MESSAGE_SUBSCRIPTION, {
            variables: {channelId: "60301e27d76972653ceef23c"}
        });
        
        if (loading) {
            return <span>Loading...</span>
        }
        if (error) {
            return <p>Something went wrong.</p>
        }
        
        console.log(data);

        return(
            <div>
                <p>
                {data}
                </p>
            </div>
        )
         
        
    }

    


export default SubTest;
