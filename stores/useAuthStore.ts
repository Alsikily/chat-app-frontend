import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

    const user = ref<object | null>(null);
    const isLogin = ref<boolean>(false);
    const token = ref<string | null>(null);

    return { user, token, isLogin };

}, {
    persist: true
})