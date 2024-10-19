<template>
    <div>
        <NuxtLayout name="auth">
            <header>Login</header>
            <form @submit.prevent="authMethods.login">
                <div class="input">
                    <input type="email" placeholder="E-mail" v-model="authMethods.loginData.email">
                </div>
                <div class="input">
                    <input type="password" placeholder="password" v-model="authMethods.loginData.password">
                    <span class="error" v-if="authMethods.LoginErrors != null">E-mail or password is invalid</span>
                </div>
                <div class="input submit">
                    <input type="submit" value="Register">
                    <span class="flash"></span>
                </div>
            </form>
            <span>
                <NuxtLink to="asd">Forget password</NuxtLink>
                <span> | </span>
                <NuxtLink to="/register">Create an account</NuxtLink>
            </span>
        </NuxtLayout>
    </div>
</template>

<script setup>

    const authMethods = useAuthMethodsStore();

    definePageMeta({
        middleware: "guest"
    });

</script>

<style lang="scss" scoped>

</style>