<template>
    <div @click="toggleMode()">
        <label for="darkmode-toggle" :class="['toggle', colorModeStore.colorMode]">
            <span></span>
        </label>
    </div>
</template>

<script setup>

    const colorMode = useColorMode();
    const colorModeStore = useColorModeStore();

    function toggleMode() {
        colorModeStore.colorMode = (colorModeStore.colorMode == 'light' ? 'dark' : 'light');
        colorMode.preference = colorModeStore.colorMode;
    }

</script>

<style lang="scss" scoped>
    @use '~/scss/helpers/colors' as colors;
    @use '~/scss/helpers/mixins' as mix;
    .toggle {
        font-size: 20px;
        border: 2px solid colors.$main-color-dark;
        border-radius: 2em;
        cursor: pointer;
        display: block;
        height: calc(2em - 1px);
        position: relative;
        width: 75px;
    }
    .toggle span {
        background-color: colors.$main-color-dark;
        border-radius: 2em;
        display: block;
        left: .25em;
        overflow: hidden;
        position: absolute;
        top: 3px;
        text-indent: -9999px;
        transition: left .25s;
        z-index: 2;
        @include mix.circle(30px);
    }
    .toggle::before,
    .toggle::after {
        content: '';
        display: block;
        border-radius: 1em;
        position: absolute;
        z-index: 1;
    }
    .toggle::after {
        box-shadow: .25em .25em #5901d8;
        height: 1.125em;
        right: .9em;
        top: .125em;
        width: 1.125em;
    }
    .toggle::before {
        background-color: #ffc409;
        height: .625em;
        outline: .25em dotted #ffc409;
        outline-offset: .125em;
        left: 12px;
        top: 12px;
        width: .625em;
    }
    .toggle.dark {
        span {
            left: 1.85em;
        }
    }
    .sr-only {
        // opacity: 0;
        position: absolute;
    }
    .dark-mode {
        .toggle {
            border-color: #fff;
            > span {
                background-color: #fff;
            }
        }
    }
</style>