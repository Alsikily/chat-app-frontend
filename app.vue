<template>
  <div class="app">
        <NuxtPage />
        <div class="cover" v-if="forms.formOpen" @click.stop="forms.toggleFormOpen">
            <div class="parent" @click.stop="">
                <FormsAddFriend v-if="forms.formName == 'addFriend'" />
            </div>
        </div>
        <!-- <div class="cover">
            <div class="parent">
                <FormsAddFriend />
            </div>
        </div> -->
  </div>
</template>

<script setup>

    const forms = useForms();

</script>