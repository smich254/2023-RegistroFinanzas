import { createApp } from 'vue';
import App from './App.vue';
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const formatDate = {
    beforeMount: function (el, binding) {
        el.innerText = new Date(binding.value).toLocaleString();
    },
    updated: function (el, binding) {
        el.innerText = new Date(binding.value).toLocaleString();
    },
};

// Inicializa Firebase
initializeApp(firebaseConfig);

const app = createApp(App);
app.directive('format-date', formatDate);
app.mount('#app');
