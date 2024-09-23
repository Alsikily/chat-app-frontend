<template>
    <aside :class="[globalInfo.asideOpen ? 'open' : '']">
        <header>
            <section class="top">
                <NuxtLink to='/chats' class="logo">{{ globalInfo.webAppName }}</NuxtLink>
                <div class="icons">
                    <span class="add" @click="forms.toggleFormOpen('addFriend')">
                        <ClientOnly>
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </ClientOnly>
                    </span>
                    <span class="options" @click="listOpened = !listOpened">
                        <ClientOnly>
                            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                        </ClientOnly>
                    </span>
                </div>
                <div class="list" v-if="listOpened">
                    <ul>
                        <li>
                            <NuxtLink to="/profile">
                                <ClientOnly>
                                    <font-awesome-icon :icon="['fas', 'user-pen']" />
                                </ClientOnly>
                                Profile
                            </NuxtLink>
                        </li>
                        <li class="plain-li" @click="authMethods.logout">
                            <ClientOnly>
                                <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
                            </ClientOnly>
                            Logout
                        </li>
                        <li class="plain-li color-mode">
                            Color mode
                            <LayoutColorMode />
                        </li>
                    </ul>
                </div>
            </section>
            <section class="search">
                <span class="icon">
                    <ClientOnly>
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="font-size: 12px;" />
                    </ClientOnly>
                </span>
                <input type="text" placeholder="Friend name">
            </section>
            <ul class="sections">
                <li class="active" @click="showSection('recent', $event)">
                    <ClientOnly>
                        <font-awesome-icon :icon="['fas', 'clock-rotate-left']" />
                    </ClientOnly>
                </li>
                <li @click="showSection('groups-friends', $event)">
                    <ClientOnly>
                        <font-awesome-icon :icon="['fas', 'user-group']" />
                    </ClientOnly>
                </li>
                <li @click="showSection('archived', $event)">
                    <ClientOnly>
                        <font-awesome-icon :icon="['fas', 'clipboard-user']" />
                    </ClientOnly>
                </li>
                <li @click="showSection('send-request', $event)">
                    <ClientOnly>
                        <font-awesome-icon :icon="['fas', 'user-plus']" />
                    </ClientOnly>
                </li>
            </ul>
        </header>
        <nav class="friends" ref="nav">
            <div class="recent active">
                <div class="section">
                    <header>Recent</header>
                    <div class="body">
                        <AsideRecentChat v-for="chat in friends.chatsRecents.data" :key='chat' :chat='chat' />
                    </div>
                    <ClientOnly>
                        <footer v-if="friends.remRecentPages.value != 0">
                            <span class="show-more" v-if="friends.fetchingRecentFriends == 0" @click="friends.getRecents()">show more</span>
                            <span class="spiner" v-else>loading...</span>
                        </footer>
                    </ClientOnly>
                </div>
            </div>
            <div class="groups-friends">
                <div class="section">
                    <header>
                        Groups
                        <span class="add-group" @click='addGroupInput = !addGroupInput'>
                            <ClientOnly>
                                <font-awesome-icon :icon="['fas', 'plus']" />
                            </ClientOnly>
                        </span>
                    </header>
                    <div class='add-group-info' v-if='addGroupInput'>
                        <input type="text" v-model='friends.groupName' placeholder='Group name'>
                        <span class="add" @click='friends.addGroup()'>
                            <ClientOnly>
                                <font-awesome-icon :icon="['fas', 'plus']" />
                            </ClientOnly>
                        </span>
                    </div>
                    <div class="body">
                        <AsideGroupChat v-for="group in friends.chatsGroups.data" :key='group' :group='group' />
                    </div>
                    <ClientOnly>
                        <footer v-if="friends.remGroupsPages.value != 0">
                            <span class="show-more" v-if="friends.fetchingGroups == 0" @click="friends.getGroups()">show more</span>
                            <span class="spiner" v-else>loading...</span>
                        </footer>
                    </ClientOnly>
                </div>
                <div class="section">
                    <header>Friends</header>
                    <div class="body">
                        <AsideFriendChat v-for="friend in friends.chatsFriends.data" :key='friend' :friend='friend' />
                    </div>
                    <ClientOnly>
                        <footer v-if="friends.remFriendsPages.value != 0">
                            <span class="show-more" v-if="friends.fetchingFriends == 0" @click="friends.getFriends()">show more</span>
                            <span class="spiner" v-else>loading...</span>
                        </footer>
                    </ClientOnly>
                </div>
            </div>
            <div class="archived">
                <div class="section">
                    <header>Archived</header>
                    <div class="body">
                        <AsideFriendChat v-for="friend in friends.chatsArchived.data" :key='friend' :friend='friend' />
                    </div>
                    <ClientOnly>
                        <footer v-if="friends.remArchivedPages.value != 0">
                            <span class="show-more" v-if="friends.fetchingArchived == 0" @click="friends.getArchived()">show more</span>
                            <span class="spiner" v-else>loading...</span>
                        </footer>
                    </ClientOnly>
                </div>
            </div>
            <div class="send-request">
                <div class="section">
                    <header>Requests</header>
                    <div class="body">
                        <FriendRequest v-for="(reqFriend, index) in friends.friendRequests" :key=reqFriend :friend=reqFriend :friendIndex=index />
                    </div>
                    <span class="no-data" v-if='friends.friendRequests.length == 0'>No data</span>
                    <ClientOnly>
                        <footer v-if="friends.remPages.value != 0">
                            <span class="show-more" v-if="friends.fetchingReqFriends == 0" @click="friends.getRequestsFriends()">show more</span>
                            <span class="spiner" v-else>loading...</span>
                        </footer>
                    </ClientOnly>
                </div>
                <div class="section">
                    <header>Sending</header>
                    <div class="body">
                        <FriendRequest v-for="(reqFriend, index) in friends.friendSendRequests" :key=reqFriend :friend=reqFriend :friendIndex=index />
                    </div>
                    <span class="no-data" v-if='friends.friendSendRequests.length == 0'>No data</span>
                    <ClientOnly>
                        <footer v-if="friends.remPages.value != 0">
                            <span class="show-more" v-if="friends.fetchingReqFriends == 0" @click="friends.getRequestsFriends()">show more</span>
                            <span class="spiner" v-else>loading...</span>
                        </footer>
                    </ClientOnly>
                </div>
            </div>
        </nav>
        <span class="switcher-open-close" @click="globalInfo.switchAside()">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
    </aside>
</template>

<script setup lang="ts">

    const friends = useFriends();
    const authMethods = useAuthMethodsStore();

    const fetchingReqFriends = computed(() => friends.fetchingReqFriends);
    const forms = useForms();
    const globalInfo = useGlobalInfos();
    const nav = ref(null);

    const listOpened = ref<true|false>(false);
    const addGroupInput = ref<true|false>(false);

    function showSection(elClassName: string, event) {

        let icons = document.querySelectorAll('main.chats-dashboard > aside > header > ul.sections > li');
        let friendsParent = document.querySelector('main.chats-dashboard > aside > nav.friends');
        let friends = friendsParent?.children;

        icons.forEach(el => {
            el.classList.remove('active');
        });
        event.currentTarget.classList.add('active');

        Array.from(friends).forEach(el => {
            if (el.classList.contains(elClassName)) {
                el.style.display = 'flex';
                el.classList.add('active');
            } else {
                el.style.display = 'none';
                el.classList.remove('active');
            }
        });

    }

</script>

<style lang="scss" scoped>

    @media(max-width: 1100px) {
        .app main.chats-dashboard > aside > span.switcher-open-close {
            display: flex !important;
        }
    }

</style>