<template>
    <NuxtLink :to='`/chats/${group.conversation_id}`'>
        <div class="personal-info">
            <div class="photo">
                <img src="~/assets/images/avatar.png">
            </div>
            <div class="name-message">
                <span class="name">
                    {{ group?.title != null ? group.title : 'No title' }}
                </span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>

    const { group } = defineProps(['group']);

</script>
