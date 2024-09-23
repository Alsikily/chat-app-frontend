<template>
    <div class="friend">
        <div class="info">
            <img src="">
            <span class="name">{{ friend.friend.name }}</span>
        </div>
        <div class="icon" @click="addFriend()">
            <ClientOnly>
                <font-awesome-icon :icon="['fas', 'user-plus']" v-if="!sendAdd"  />
                <font-awesome-icon :icon="['fas', 'user-minus']" v-else class="minus" />
            </ClientOnly>
        </div>
    </div>
</template>

<script setup>

    const friends = useFriends();
    const friend = defineProps(['friend', 'friend_index']);
    const sendAdd = ref(false);

    function addFriend() {

        sendAdd.value = !sendAdd.value;
        friends.addFriend(friend.friend.id).then((resolve) => {
            if (resolve === "delete") {
                sendAdd.value = false;
            } else if (resolve === 'add') {
                sendAdd.value = true;
            }
        });

    }

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .friend {
        display: flex;
        justify-content: space-between;
        > .info {

        }
        > .icon {
            cursor: pointer;
            > .minus {
                color: colors.$main-color-light;
            }
        }
    }

</style>