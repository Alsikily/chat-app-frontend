import { defineStore } from 'pinia'
import { useApiFetch } from '~/composables/useApiFetch';

type RegisterFormData = {
    username: string,
    email: string,
    password: string
};
type LoginFormData = Pick<RegisterFormData, ("email" | "password")>;

export const useAuthMethodsStore = defineStore('authMethods', () => {

    const authStore = useAuthStore();

    const LoginErrors = ref(null);
    const RegisterErrors = ref(null);
    const loginData: LoginFormData = ref({
        email: '',
        password: ''
    });
    const registerData: RegisterFormData = ref({
        name: '',
        email: '',
        password: ''
    });

    function setStates(usr: null, islog: false, tkn: null) {
        authStore.user = usr;
        authStore.isLogin = islog;
        authStore.token = tkn;
    }

    function redirectToDashboard() {
        navigateTo(`chats`);
    }

    async function login() {

        const response = await useApiFetch("login", {
            method: "POST",
            body: loginData
        });

        if (response.value.status == "success") {

            setStates(response.value.user, true, `${response.value.authorisation.type} ${response.value.authorisation.token}`);
            redirectToDashboard();

        } else {

            RegisterErrors.value = response.value.messages;

        }

    }

    async function register() {

        const response = await useApiFetch("register", {
            method: "POST",
            body: registerData
        });

        if (response.value.status == "success") {

            setStates(response.value.user, true, `${response.value.authorisation.type} ${response.value.authorisation.token}`);
            redirectToDashboard();

        }

        return response;

    }

    async function logout() {

        const response = await useApiFetch("logout", {
            method: "POST",
            headers: {
                Authorization: `${authStore.token}`
            }
        });

        if (response.value.status == "success") {

            setStates(null, false, null);
            return navigateTo(`/login`);

        }

        // return response;

    }

    return { loginData, registerData, login, register, logout };

})