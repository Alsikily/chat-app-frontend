<template>
    <NuxtLink :to='`/chats/${friend.user.id}`' class="active">
        <div class="personal-info">
            <div class="photo">
                <img src="~/assets/images/avatar.png" alt="samy photo">
            </div>
            <div class="name-message">
                <span class="name">{{ friend.user.name }}</span>
                <span class="message">
                    15 common friend
                </span>
                <div class="message-info">
                    <span class="date" @click.prevent="friends.responseFriend(friend.id, friendIndex, 'approved')">
                        <ClientOnly>
                            <font-awesome-icon :icon="['fas', 'check']" />
                        </ClientOnly>
                    </span>
                    <span class="msg-num" @click.prevent="friends.responseFriend(friend.id, friendIndex, 'refused')">
                        <ClientOnly>
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                        </ClientOnly>
                    </span>
                </div>
            </div>
        </div>
        <!-- <div class="message-info">
            <span class="date" @click.prevent="friends.responseFriend(friend.id, friendIndex, 'approved')">
                <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'check']" />
                </ClientOnly>
            </span>
            <span class="msg-num" @click.prevent="friends.responseFriend(friend.id, friendIndex, 'refused')">
                <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </ClientOnly>
            </span>
        </div> -->
    </NuxtLink>
</template>

<script setup>

    const friends = useFriends();
    const { friend, friendIndex } = defineProps(['friend', 'friendIndex']);

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .message-info {
        display: flex;
        gap: 4px;
        > span {
            width: 40px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-radius: 3px;
            &.date {
                color: colors.$color-success;
            }
            &.msg-num {
                color: colors.$color-danger;
            }
        }
    }
</style>
