import { createApp } from 'vue';
import App from './App.vue';

const formatDate = {
    beforeMount: function (el, binding) {
        el.innerText = new Date(binding.value).toLocaleString();
    },
    updated: function (el, binding) {
        el.innerText = new Date(binding.value).toLocaleString();
    },
};

const app = createApp(App);
app.directive('format-date', formatDate);
app.mount('#app');
