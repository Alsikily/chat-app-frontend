<template>
    <section class="chat">
        <div class="exists" v-if="useRoute().params.chat_id != undefined">
            <header>
                <div class="info active" @click="chats.opendInfo = true">
                    {{ chats.conversation?.title != null ? chats.conversation.title : chats.conversation?.name }}
                </div>
                <!-- <div class="options">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </div> -->
            </header>
            <section class="body">
                <div class="day" v-for="(dayUsers, day, index) in chats.messagesData" :key="day">
                    <span class="header" :data-date="day"></span>
                    <div class="messages">
                        <div :class="['user', Object.keys(user)[0] == auth.user.id ? 'me' : 'other' ]" v-for="(user, userId) in chats.reverseArray(dayUsers)" :key="userId">
                            <div class="photo">
                                <div class="img">
                                    <img src="~/assets/images/avatar.png" width="50" height="50" alt="photo">
                                </div>
                            </div>
                            <div class="user-messages">
                                <div class="user-message-container" v-for="message in chats.reverseArray(user[Object.keys(user)[0]])">
                                    <!-- {{ message.files }} -->
                                    <div class="msg files" v-if="message.files != null">
                                        <span v-if='message.content != null'>{{ message.content }}</span>
                                        <div class='images'>
                                            <img  v-for="file in message.files" :src="file" alt="">
                                        </div>
                                    </div>
                                    <div class="msg" v-else-if="message.content != null">{{ message.content }}</div>
                                    <div class="msg record" v-else-if="message.record != null">
                                        <audio controls>
                                            <source :src="message.record">
                                        </audio>
                                    </div>
                                    <!-- <div class="msg file" v-else-if="message.file != null">
                                        <img :src=''>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <form class="sender">
                <div :class="['record', chats.isRecording ? 'recording' : '']">
                    <div class="left">
                        <span class="delete-record" @click="chats.deleteRecord">
                            <ClientOnly>
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </ClientOnly>
                        </span>
                        <span class="sending-animation">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <span class="right">15s</span>
                </div>
                <div :class="['input', chats.isRecording ? 'recording' : '']">
                    <input type="text" v-model="chats.content" placeholder="Type your message here...">
                </div>
                <div :class="['options', chats.isRecording ? 'recording' : '']">
                    <!-- <audio class="playback" controls :src="chats.src"></audio> -->
                    <span @click="inputFile.click">
                        <input ref="inputFile" type="file" multiple style="width: 0;height: 0;" @change="chats.handleFileChange">
                        <ClientOnly>
                            <font-awesome-icon :icon="['fas', 'paperclip']" />
                        </ClientOnly>
                    </span>
                    <span @click="chats.toggleRecord">
                        <ClientOnly>
                            <font-awesome-icon :icon="['fas', 'microphone']" />
                        </ClientOnly>
                    </span>
                </div>
                <div class="send" @click="chats.sendMessage(chat_id)">
                    <ClientOnly>
                        <font-awesome-icon :icon="['fas', 'location-arrow']" />
                    </ClientOnly>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>

    const chats = useChatsStore();
    const auth = useAuthStore();
    const chat_id = useRoute().params.chat_id;

    const inputFile = ref(null);

    await chats.getConversation(chat_id);

    onMounted(() => {
        chats.setupAudio();
    });

    // throw createError({ statusCode: 200, statusMessage: 'Message' });

</script>

<style lang="scss" scoped>



</style>