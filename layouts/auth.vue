<template>
    <div class="auth-container">
        <LayoutColorMode class="color-mode" />
        <div class="auth-form">
            <slot />
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
    @use '~/scss/helpers/mixins' as mix;
    .color-mode {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>