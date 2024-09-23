<template>
    <NuxtLayout name="auth">
        <header>Register</header>
        <form @submit.prevent="authMethods.register">
            <div class="input">
                <input type="text" placeholder="Username" v-model="authMethods.registerData.name">
            </div>
            <div class="input">
                <input type="email" placeholder="E-mail" v-model="authMethods.registerData.email">
            </div>
            <div class="input">
                <input type="password" placeholder="password" v-model="authMethods.registerData.password">
            </div>
            <div class="input submit">
                <input type="submit" value="Register">
                <span class="flash"></span>
            </div>
        </form>
        <!-- <span>
            <NuxtLink to="/login">Forget password</NuxtLink>
            |
            <NuxtLink to="/login">Have an account</NuxtLink>
        </span> -->
    </NuxtLayout>
</template>

<script setup>

    const authMethods = useAuthMethodsStore();

    definePageMeta({
        middleware: 'guest'
    });

</script>

<style lang="scss" scoped>

</style>