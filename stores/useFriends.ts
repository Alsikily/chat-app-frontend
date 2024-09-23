export const useFriends = defineStore('friends', () => {

    const auth = useAuthStore();
    const chats = useChatsStore();

    const friendName: string = ref('');
    const friendsSearch: [] = ref([]);
    const friendsSearchPage: number = ref(1);

    // Recents
    const friendsRecentsPage = ref(1);
    const remRecentPages = computed(() => friendsRecentsPage);
    const fetchingRecentFriends = ref(0);
    let myRecents = [];
    const chatsRecents = ref([]);

    // Groups
    const friendsGroupsPage = ref(1);
    const remGroupsPages = computed(() => friendsGroupsPage);
    const fetchingGroups = ref(0);
    let myGroups = [];
    const chatsGroups = ref([]);

    // Friends
    const friendsPage = ref(1);
    const remFriendsPages = computed(() => friendsPage);
    const fetchingFriends = ref(0);
    let myFreinds = [];
    const chatsFriends = ref([]);

    // Archived
    const archivedPage = ref(1);
    const remArchivedPages = computed(() => archivedPage);
    const fetchingArchived = ref(0);
    let myArchived = [];
    const chatsArchived = ref([]);

    // Requests Friends
    const friendsRequestsPage = ref(1);
    const remPages = computed(() => friendsRequestsPage);
    let myFriends = [];
    const friendRequests: [] = ref([]);
    const fetchingReqFriends = ref(0);

    // Send Requests Friends
    const sendFriendsRequestsPage = ref(1);
    const remSendingPages = computed(() => sendFriendsRequestsPage);
    let mySendRquestsFriends = [];
    const friendSendRequests: [] = ref([]);
    const fetchingSendReqFriends = ref(0);

    // Pagination
    const requestsFriendsNextPage = ref(1);

    // Add Group
    const groupName = ref(null);

    // Suggests
    const suggests = ref(null);
    const suggestions = ref([]);

    // Search About friend
    async function searchAboutFriend() {

        const response = await useApiFetch(`friends/search/${friendName.value.trim()}?page=${friendsSearchPage}`, {
            headers: {
                Authorization: `${auth.token}`
            }
        });

        if (response.value.status == "success") {

            friendsSearch.value = response.value.data.data;

        } else {

            RegisterErrors.value = response.value.messages;

        }

    }

    // Add new friend
    async function addFriend(friend_id: number) {

        const response = await useApiFetch(`friends`, {
            method: 'POST',
            body: {
                friend_id: friend_id
            },
            headers: {
                Authorization: `${auth.token}`
            }
        });

        if (response.value.status == "success") {

            return response.value.action;

        } else {

            return 'error';

        }

    }

    // Get friends requests
    async function getRequestsFriends() {
        if ((fetchingReqFriends.value == 0) && (friendsRequestsPage.value != 0)) {

            fetchingReqFriends.value = 1;

            const response = await useApiFetch(`friends/requests?page=${friendsRequestsPage.value}`, {
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                fetchingReqFriends.value = 0;
                let last_page = response.value.data.last_page;

                if ((last_page - friendsRequestsPage.value) > 0) {
                    friendsRequestsPage.value += 1;
                } else {
                    friendsRequestsPage.value = 0;
                }

                myFriends = myFriends.concat(response.value.data.data);
                friendRequests.value = myFriends;

            }

        }
    }

    // Get friends requests
    async function getSendRequestsFriends() {
        if ((fetchingSendReqFriends.value == 0) && (sendFriendsRequestsPage.value != 0)) {

            fetchingSendReqFriends.value = 1;

            const response = await useApiFetch(`friends/sends?page=${sendFriendsRequestsPage.value}`, {
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                fetchingSendReqFriends.value = 0;
                let last_page = response.value.data.last_page;

                if ((last_page - sendFriendsRequestsPage.value) > 0) {
                    sendFriendsRequestsPage.value += 1;
                } else {
                    sendFriendsRequestsPage.value = 0;
                }

                mySendRquestsFriends = mySendRquestsFriends.concat(response.value.data.data);
                friendSendRequests.value = mySendRquestsFriends;

            }

        }
    }

    // Get Recents Chats
    async function getRecents() {

        if ((fetchingRecentFriends.value == 0) && (friendsRecentsPage.value != 0)) {

            fetchingRecentFriends.value = 1;

            const response = await useApiFetch(`friends/recents?page=${friendsRecentsPage.value}`, {
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                let last_page = response.value.data.last_page;

                if ((last_page - friendsRecentsPage.value) > 0) {
                    friendsRecentsPage.value += 1;
                } else {
                    friendsRecentsPage.value = 0;
                }

                myRecents.length != 0 ? (myRecents['data'] = myRecents['data'].concat(response.value.data.data)) : (myRecents = response.value.data);
                chatsRecents.value = myRecents;

            }

            fetchingRecentFriends.value = 0;

        }

    }

    async function getGroups() {

        if ((fetchingGroups.value == 0) && (friendsGroupsPage.value != 0)) {

            fetchingGroups.value = 1;

            const response = await useApiFetch(`friends/groups?page=${friendsGroupsPage.value}`, {
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                let last_page = response.value.data.last_page;

                if ((last_page - friendsGroupsPage.value) > 0) {
                    friendsGroupsPage.value += 1;
                } else {
                    friendsGroupsPage.value = 0;
                }

                myGroups.length != 0 ? (myGroups['data'] = myGroups['data'].concat(response.value.data.data)) : (myGroups = response.value.data);
                chatsGroups.value = myGroups;

            }

            fetchingGroups.value = 0;

        }

    }

    async function addGroup() {

        const response = await useApiFetch(`friends/groups`, {
            method: 'POST',
            body: {
                groupName: groupName.value
            },
            headers: {
                Authorization: `${auth.token}`
            }
        });

        if (response.value.status == "success") {

            chatsGroups.value.data.push(response.value.conversation)
            groupName.value = null;

        }

    }

    async function getFriends() {

        if ((fetchingFriends.value == 0) && (friendsPage.value != 0)) {

            fetchingFriends.value = 1;

            const response = await useApiFetch(`friends/friends?page=${friendsPage.value}`, {
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                let last_page = response.value.data.last_page;

                if ((last_page - friendsPage.value) > 0) {
                    friendsPage.value += 1;
                } else {
                    friendsPage.value = 0;
                }

                myFreinds.length != 0 ? (myFreinds['data'] = myFreinds['data'].concat(response.value.data.data)) : (myFreinds = response.value.data);
                chatsFriends.value = myFreinds;

            }

            fetchingFriends.value = 0;

        }

    }

    async function getArchived() {

        if ((fetchingArchived.value == 0) && (archivedPage.value != 0)) {

            fetchingArchived.value = 1;

            const response = await useApiFetch(`friends/archived?page=${archivedPage.value}`, {
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                let last_page = response.value.data.last_page;

                if ((last_page - archivedPage.value) > 0) {
                    archivedPage.value += 1;
                } else {
                    archivedPage.value = 0;
                }

                myArchived.length != 0 ? (myArchived['data'] = myArchived['data'].concat(response.value.data.data)) : (myArchived = response.value.data);
                chatsArchived.value = myArchived;

            }

            fetchingArchived.value = 0;

        }

    }

    // Accept Add friend request
    async function responseFriend(request_id: number, user_index: number,respStatus: ('approved'|'refused')) {

        const response = await useApiFetch(`friends/response/${request_id}`, {
            method: 'post',
            body: {
                status: respStatus
            },
            headers: {
                Authorization: `${auth.token}`
            }
        });

        if (response.value.status == "success") {

            friendRequests.value.splice(user_index, 1);

        }

    }

    function block(chat_id: number) {
        let index = chatsRecents.data.findIndex(item => item.conversation_id == chat_id);
        chatsRecents.data.splice(index, 1);
    }

    // Block user
    async function blockUser(chat_id: number, user_id: number) {

        if (confirm('Are you sure to block this user ?')) {

            const response = await useApiFetch(`friends/${chat_id}/block`, {
                method: 'PATCH',
                body: {
                    user_id: user_id
                },
                headers: {
                    Authorization: `${auth.token}`
                }
            });

            if (response.value.status == "success") {

                chats.conversation.value = null;
                chats.messagesData.value = null;
                block(chat_id);
                return navigateTo('/chats');

            } else {
                return 'error';
            }

        }
    }

    async function getSuggest() {

        const response = await useApiFetch('friends/suggestion', {
            method: 'POST',
            body: {
                chat_id: useRoute().params.chat_id,
                name: suggests
            },
            headers: {
                Authorization: `${auth.token}`
            }
        });

        if (response.value.status == 'success') {
            suggestions.value = response.value.data;
        }

    }

    return {

        // States
        friendName,
        friendsSearch,
        requestsFriendsNextPage,
        friendRequests,
        fetchingReqFriends,
        remPages,
        groupName,
        suggests,
        suggestions,

        // Recents
        fetchingRecentFriends,
        remRecentPages,
        chatsRecents,

        // Groups
        fetchingGroups,
        remGroupsPages,
        chatsGroups,

        // Friends
        fetchingFriends,
        remFriendsPages,
        chatsFriends,

        // Archived
        fetchingArchived,
        remArchivedPages,
        chatsArchived,

        // Send Requests Friends
        fetchingSendReqFriends,
        remSendingPages,
        friendSendRequests,

        // Methods
        searchAboutFriend,
        addFriend,
        getRecents,
        getGroups,
        addGroup,
        getFriends,
        getArchived,
        getRequestsFriends,
        getSendRequestsFriends,
        responseFriend,
        blockUser,
        getSuggest
    };

});
