import { defineStore } from 'pinia'
// import { useAuthStore } from '~/stores/useAuthStore';

export const useColorModeStore = defineStore('colorModeStore', () => {

    // const auth = useAuthStore();
    const colorMode = ref('light');
    return { colorMode };

}, {
    persist: true
});
