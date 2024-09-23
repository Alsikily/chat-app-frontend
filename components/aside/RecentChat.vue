<template>
    <NuxtLink :to='`/chats/${chat.conversation_id}`' class="active">
        <div class="personal-info">
            <div class="photo">
                <img src="~/assets/images/avatar.png" :alt="chat.name">
            </div>
            <div class="name-message">
                <span class="name">{{ chat.title === null ? chat.name : chat.title }}</span>
                <span class="message">{{ chat.content }}</span>
            </div>
        </div>
        <div class="message-info msg-recent">
            <ClientOnly>
                <!-- <span class="msg-exist" v-if="!chat?.read_users?.split(',').includes((auth.user?.id).toString())"></span> -->
            </ClientOnly>
        </div>
    </NuxtLink>
</template>

<script setup>

    const { chat } = defineProps(['chat']);
    const auth = useAuthStore();

</script>

<style lang="scss" scoped>



</style>