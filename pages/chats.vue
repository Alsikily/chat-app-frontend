<template>
    <NuxtLayout name="chats">
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">

    const friends = useFriends();

    // Created function
    await friends.getRecents(); // Recents
    await friends.getGroups(); // Groups
    await friends.getFriends(); // Friends
    await friends.getArchived(); // Archived
    await friends.getSendRequestsFriends(); // Friends requests
    await friends.getRequestsFriends(); // Friends requests

    definePageMeta({
        middleware: 'auth'
    });

</script>