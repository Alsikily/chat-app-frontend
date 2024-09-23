<template>
    <div class="matches-container">
        <div class="search">
            <h1>{{ globalInfos.webAppName }}</h1>
            <p>Exploring the Friend Search Feature in chat me App: Enhancing Social Connectivity</p>
            <div class="input">
                <div class="icon">
                    <ClientOnly>
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="font-size: 12px;" />
                    </ClientOnly>
                </div>
                <input type="search" v-model="friends.friendName" placeholder="Friend name..." @keyup="friends.searchAboutFriend">
            </div>
        </div>
        <div class="matched">
            <header>
                <ClientOnly>
                    <font-awesome-icon :icon="['fas', 'check']" />
                </ClientOnly>
                Matched results
            </header>
            <div class="friends">
                <FriendMatched v-for="(friend, index) in friends.friendsSearch" :key="friend" :friend="friend" :friend_index="index" />
            </div>
        </div>
    </div>
</template>

<script setup>

    const globalInfos = useGlobalInfos();
    const friends = useFriends();

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .matches-container {
        width: 700px;
        height: 300px;
        display: flex;
        $padding-between: 10px;
        > .search {
            flex: 5;
            padding-right: $padding-between;
            > h1 {
                color: colors.$main-color-light;
            }
            > .input {
                height: 50px;
                display: flex;
                align-items: center;
                background-color: rgb(59 153 255 / 10%);
                border: 1px solid colors.$main-color-light;
                border-radius: 3px;
                overflow: hidden;
                > .icon,
                > input {
                    height: 100%;
                }
                > .icon {
                    display: flex;
                    width: 45px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    svg {
                        font-size: 10px;
                        width: 16px;
                        color: colors.$main-color-light;
                    }
                }
                > input {
                    background-color: transparent;
                    padding-right: 5px;
                }
            }
        }
        > .matched {
            flex: 4;
            display: flex;
            flex-direction: column;
            border-left: 1px solid rgba(192, 192, 192, 50%);
            padding-left: $padding-between;
            > header {
                color: colors.$main-color-light;
                font-weight: bold;
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 5px;
                > svg {
                    font-size: 16px;
                    width: 18px;
                    height: 18px;
                }
            }
            > .friends {
                flex: 1;
                overflow: auto;
                &::-webkit-scrollbar {
                    width: 2px;
                }
            }
        }
    }

</style>