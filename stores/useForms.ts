export const useForms = defineStore('forms', () => {

    const formOpen = ref(false);
    const formName = ref('');

    function toggleFormOpen(openFormName: string = '') {
        formOpen.value = !formOpen.value;
        formName.value = openFormName;
    }

    return { formOpen, formName, toggleFormOpen };

});
