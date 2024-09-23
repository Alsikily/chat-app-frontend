<template>
    <!-- <NuxtLink :to='`/chats/${friend.conversation_id}`' class="active"> -->
    <NuxtLink :to='`/chats/${friend.conversation_id}`'>
        <div class="personal-info">
            <div class="photo">
                <img src="~/assets/images/avatar.png" alt="">
            </div>
            <div class="name-message">
                <span class="name">
                    {{ friend.title != null ? friend.title : friend.name }}
                </span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>

    const { friend } = defineProps(['friend']);

</script>
