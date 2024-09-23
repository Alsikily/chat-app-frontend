export const useGlobalInfos = defineStore('globalInfos', () => {

    const webAppName = 'CHAT ME';
    const asideOpen = ref(true);
    const friendOpne = ref(true);

    function switchAside() {
        asideOpen.value = !asideOpen.value;
    }

    function switchFriendInfo() {
        friendOpne.value = !friendOpne.value;
    }

    return { webAppName, asideOpen, friendOpne, switchAside, switchFriendInfo };

});
