import Pusher from 'pusher-js';

export default defineNuxtPlugin(() => {

    const auth = useAuthStore();
    const chats = useChatsStore();

    if (auth.isLogin) {

        const pusher = new Pusher('b71b1ae0a0d8bcacaf26', {
            cluster: "eu",
            // authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
            // auth: {
            //     headers: {
            //         Authorization: `${auth.token}`
            //     },
            // },
        });

        Pusher.logToConsole = true;
        const channel = pusher.subscribe(`privateChannel.${auth.user.id}`);
        channel.bind('send-message', function(data) {

            let response = JSON.parse(data.message);
            let lastDay = Object.keys(chats.messagesData)[Object.keys(chats.messagesData).length -1];

            if (lastDay == response.sent_at) {

                let lastUser = Object.keys(chats.messagesData[response.sent_at][0])[0];

                if (lastUser != auth.user.id) {
    
                    chats.messagesData[response.sent_at][0][lastUser].unshift(response);
    
                } else {
    
                    chats.messagesData[response.sent_at].unshift({
                        [response.sender_id]: [response]
                    });
    
                }

            } else {
                chats.getConversation(useRoute().params.chat_id);
            }

        });

    }

});