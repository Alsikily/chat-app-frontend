import { defineStore } from 'pinia'
// import { useAuthStore } from '~/stores/useAuthStore';

export const useChatsStore = defineStore('chats', () => {

    const auth = useAuthStore();
    const friends = useFriends();
    const conversation = ref(null);
    const messagesData = ref(null);

    // options
    const opendInfo = ref(true);

    // Message states
    const content = ref(null);
    const record = ref(null);
    let files = [];
    const inputFile = ref(null);
    const firstDay = ref(false);

    // Record Audio vars
    const isRecording = ref(false);
    const src = ref(null);
    const recordURL = ref(null);
    let canRecord = false;
    let recorder = null;
    let chunks = [];

    // Functions
    function setupAudio() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(setupStream)
            .catch(error => console.error(error));
        }
    }

    function setupStream(stream) {

        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = e => {
            chunks.push(e.data);
        }

        recorder.onstop = (e) => {
            record.value = chunks;
            const blob = new Blob(chunks);
            const url = URL.createObjectURL(blob);
            recordURL.value = url;
            chunks = [];
        }

        canRecord = true;

    }

    async function toggleRecord() {
        if (!canRecord) return;
        isRecording.value = !isRecording.value;
        isRecording.value ? await recorder.start() : await recorder.stop();
    }

    function deleteRecord() {
        isRecording.value ? recorder.stop() : '';
        isRecording.value = false;
        chunks = [];
    }

    async function reverseObject(object) {

        const reversedObject = {};
        Object.keys(object).reverse().forEach(key => {
            reversedObject[key] = object[key];
        });

        return reversedObject;
    }

    function reverseArray(arr) {
        return [...arr].reverse();
    }

    function resetChatInfo() {
        conversation.value = null;
        messagesData.value = null;
    }

    function markAsRead(chat_id: number) {
        let index = friends.chatsRecents.data.findIndex(item => item.conversation_id == chat_id);
        friends.chatsRecents.data[index].read_users += `,${auth.user.id}`;
    }

    async function getConversation(chatID: number) {

        const response = await useApiFetch(`chats/${chatID}`, {
            headers: {
                Authorization: `${auth.token}`
            }
        });

        resetChatInfo();
        if (response.value.status == "success") {
            // markAsRead(chatID);
            conversation.value = response.value.data;
            messagesData.value = await reverseObject(response.value.data.messages.data);
        }
        // if (friends.chatsRecents.data.findIndex(item => item.conversation_id == chatID) != -1) {

        // } else {
        //     navigateTo(`/chats`);
        // }

    }

    async function sendMessage($chat_id_param) {

        if (isRecording.value) {
            await toggleRecord();
        }

        setTimeout(async () => {

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const createdMessage = {
                content: content.value,
                record: recordURL.value,
                files: files,
                sender_id: auth.user.id
            };

            if (messagesData.value[formattedDate] != undefined) {

                let lastUser = Object.keys(messagesData.value[formattedDate][0])[0];

                if (lastUser == auth.user.id) {

                    messagesData.value[formattedDate][0][lastUser].unshift(createdMessage);

                } else {

                    messagesData.value[formattedDate].unshift({
                        [auth.user.id]: [createdMessage]
                    });

                }

            } else {

                firstDay.value = true;

            }

            const FD = new FormData();
            FD.append('content', JSON.stringify(content.value));
            if (record.value != null) {
                FD.append('record', record.value[0]);
                record.value = null;
            }
            if (files.length > 0) {
                FD.append('files', JSON.stringify(true));
                for(let x = 1; x <= files.length; x++) {
                    FD.append(`file_${x}`, files[x -1]);
                }
            }

            recordURL.value = null;
            content.value = null;
            record.value = null;
            files = [];

            const response = await useApiFetch(`chats/${$chat_id_param}/send`, {
                method: "POST",
                body: FD,
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                if (!firstDay.value) {
                    messagesData.value[formattedDate][0][auth.user.id][0] = response.value.data;
                } else {
                    getConversation($chat_id_param);
                }

            }

        }, 0);

    }

    function handleFileChange(event) {
        files = event.target.files;
    }

    // Delete Conversation
    async function deleteChat(chat_id: number) {

        if (window.confirm('Are you sure to delete the conversation ?')) {

            const response = await useApiFetch(`chats/${chat_id}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                conversation.value = null;
                messagesData.value = null;
                return navigateTo('/chats');

            } else {

                return 'error';

            }

        }

    }

    function archive(chat_id: number) {
        let index = friends.chatsRecents.data.findIndex(item => item.conversation_id == chat_id);
        let chat = friends.chatsRecents.data.find(item => item.conversation_id == chat_id);
        if (!chat) {
            chat = friends.chatsGroups.data.find(item => item.conversation_id == chat_id);
            if (!chat) {
                chat = friends.chatsFriends.data.find(item => item.conversation_id == chat_id);
            }
        }
        friends.chatsArchived.data.unshift(chat);
        friends.chatsRecents.data.splice(index, 1);
    }

    // Archive Conversation
    async function archiveChat(chat_id: number) {

        const response = await useApiFetch(`chats/${chat_id}`, {
            method: 'PATCH',
            body: {
                archived: conversation.value.archived ^ 1
            },
            headers: {
                Authorization: `${auth.token}`
            }
        });

        if (response.value.status == "success") {

            conversation.value = null;
            messagesData.value = null;
            archive(chat_id);
            return navigateTo('/chats');

        } else {
            return 'error';
        }

    }

    // Archive Conversation
    // async function unarchiveChat(chat_id: number) {

    //     const response = await useApiFetch(`chats/${chat_id}`, {
    //         method: 'PATCH',
    //         body: {
    //             archived: conversation.value.archived == 0 ? 1 : 0
    //         },
    //         headers: {
    //             Authorization: `${auth.token}`
    //         }
    //     });

    //     if (response.value.status == "success") {

    //         conversation.value = null;
    //         messagesData.value = null;
    //         archive(chat_id);
    //         return navigateTo('/chats');

    //     } else {
    //         return 'error';
    //     }

    // }

    async function addMember(memberID: number) {

        const response = await useApiFetch(`chats/addMember`, {
            method: 'POST',
            body: {
                chat_id: useRoute().params.chat_id,
                member_id: memberID
            },
            headers: {
                Authorization: `${auth.token}`
            }
        });

        if (response.value.status == 'success') {

            let indexOfUser = friends.suggestions.findIndex(item => {
                return item.id == memberID;
            });
            conversation.value.members.push(friends.suggestions[indexOfUser]);    
            friends.suggests = null;
            friends.suggestions = [];

        }

    }

    // Delete Conversation
    async function removeMember(memberID: number) {

        if (window.confirm('Are you sure to remove member ?')) {

            const response = await useApiFetch(`chats/${useRoute().params.chat_id}/${memberID}/removeMember`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                conversation.value.members.splice(conversation.value.members.findIndex(item => {
                    return item.id == memberID;
                }), 1);

            }

        }

    }

    return {

        // States
        opendInfo,
        conversation,
        messagesData,
        src,
        content,
        isRecording,
        inputFile,

        // Actions
        getConversation,
        reverseObject,
        reverseArray,
        sendMessage,
        setupAudio,
        toggleRecord,
        deleteRecord,
        handleFileChange,
        deleteChat,
        archiveChat,
        addMember,
        removeMember

    };

});
