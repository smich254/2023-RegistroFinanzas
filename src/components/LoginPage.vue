<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <input type="email" v-model="login.email" placeholder="Email">
        <input type="password" v-model="login.password" placeholder="Password">
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuth } from '../composables/useAuth';
  
  export default {
    setup() {
      const { loginUser } = useAuth();
      const login = ref({ email: '', password: '' });
  
      return { login, loginUser };
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
  }
  </style>
  