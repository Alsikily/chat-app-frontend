<template>
    <div class="info-container" v-if="globalInfo.friendOpne">
        <div class="info" v-if="useRoute().params.chat_id != undefined">
            <span class="close" @click="globalInfo.switchFriendInfo()">
                <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </ClientOnly>
            </span>
            <div class="body">
                <div class="personal">
                    <div class="img">
                        <img src="~/assets/images/1.jpg" alt="">
                    </div>
                    <ClientOnly>
                        <span class="name">{{ chats.conversation?.title != null ? chats.conversation.title : chats.conversation?.name }}</span>
                    </ClientOnly>
                </div>
                <div class="call">
                    <div class="voice"></div>
                    <div class="video"></div>
                    <span class="line"></span>
                </div>
                <main>
                    <section>
                        <header @click="changeSection(1)">
                            <span :class="['icon', activeSections.includes(1) ? 'opened' : '']"></span>
                            <span class="title">Images</span>
                        </header>
                        <section :class="['content', activeSections.includes(1) ? 'opened' : '']">
                            <div class="files" v-for='message in messages'>
                                <div class="file" v-for="file in message.files">
                                    <img :src="file" alt="file">
                                </div>
                            </div>
                        </section>
                    </section>
                    <section>
                        <header @click="changeSection(2)">
                            <span :class="['icon', activeSections.includes(2) ? 'opened' : '']"></span>
                            <span class="title">Info</span>
                        </header>
                        <section :class="['content', activeSections.includes(2) ? 'opened' : '']">Content 2</section>
                    </section>
                    <section v-if="chats.conversation?.type == 'group'">
                        <header @click="changeSection(3)">
                            <span :class="['icon', activeSections.includes(3) ? 'opened' : '']"></span>
                            <span class="title">Members <ClientOnly>({{ chats?.conversation?.members.length }})</ClientOnly></span>
                        </header>
                        <section :class="['content', activeSections.includes(3) ? 'opened' : '']">
                            <ClientOnly>
                                <div class="members" v-if="chats.conversation">
                                    <div class="member" v-for="member in chats.conversation.members">
                                        <div class="info">
                                            <div class="img">
                                                <img v-if='member.user' :src="member.user.photo">
                                                <img v-else src="~/assets/images/avatar.png">
                                            </div>
                                            <span class="name" v-if="member.user">{{ member.user.name }}</span>
                                            <span class="name" v-else>{{ member.name }}</span>
                                        </div>
                                        <span class="remove" @click="chats.removeMember(member.user ? member.user.id : member.id)">
                                            <ClientOnly>
                                                <font-awesome-icon :icon="['fas', 'xmark']" />
                                            </ClientOnly>
                                        </span>
                                    </div>
                                </div>
                            </ClientOnly>
                            <div class="add-member">
                                <div class="inputs">
                                    <input type="text" v-model="friends.suggests"placeholder="Add friend" @keyup="friends.getSuggest()">
                                    <span class="add">
                                        <ClientOnly>
                                            <font-awesome-icon :icon="['fas', 'plus']" />
                                        </ClientOnly>
                                    </span>
                                </div>
                                <ul class="suggests">
                                    <li v-for="suggest in friends.suggestions" @click="chats.addMember(suggest.id)">
                                        <span class="name">{{ suggest.name }}</span>
                                        <span class="email">{{ suggest.email }}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </section>
                </main>
                <div class="actions">
                    <div class="action archive" @click="chats.archiveChat(useRoute().params.chat_id)">
                        <span class="icon">
                            <ClientOnly>
                                <font-awesome-icon :icon="['fas', 'clipboard-user']" />
                            </ClientOnly>
                        </span>
                        <span class="title" v-if="!chats.conversation?.archived">
                            Archive user
                        </span>
                        <span class="title" v-else>
                            Unarchive user
                        </span>
                    </div>
                    <div class="action delete" @click="chats.deleteChat(useRoute().params.chat_id)">
                        <span class="icon">
                            <ClientOnly>
                                <font-awesome-icon :icon="['fas', 'user-xmark']" />
                            </ClientOnly>
                        </span>
                        <span class="title">
                            Delete chat
                        </span>
                    </div>
                    <div class="action block" @click="friends.blockUser(useRoute().params.chat_id, chats.conversation.user_id)">
                        <span class="icon">
                            <ClientOnly>
                                <font-awesome-icon :icon="['fas', 'user-lock']" />
                            </ClientOnly>
                        </span>
                        <span class="title">
                            Block user
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info" v-else>
            <span class="close" @click="globalInfo.switchFriendInfo()">
                <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </ClientOnly>
            </span>
            <div class="body">
                <div class="personal">
                    <div class="img">
                        <img :src="auth.user.photo" alt="">
                        <span></span>
                    </div>
                    <ClientOnly>
                        <span class="name">{{ auth.user.name }}</span>
                    </ClientOnly>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    const globalInfo = useGlobalInfos();
    const chats = useChatsStore();
    const auth = useAuthStore();
    const friends = useFriends();
    const activeSections = ref([]);
    const messages = computed(() => {
        return chats.conversation?.files.data.filter((file) => {
            return file.files;
        });
    });
    const JSONFile = computed((files) => {
        return JSON.stringify(files);
    });

    function changeSection(sectionNum) {
        let indexOfSection = activeSections.value.indexOf(sectionNum);
        indexOfSection != -1 ? activeSections.value.splice(indexOfSection, 1) : activeSections.value.push(sectionNum);
    }

</script>

<style lang="scss" scoped>
    @media(max-width: 1100px) {
        .app main.chats-dashboard > .info-container {
            position: absolute;
            height: 100%;
            width: 300px;
            top: 0;
            right: 0;
            box-shadow: 0 0 8px 5px #ebebeb;
        }
    }
</style>
h@gmail.com