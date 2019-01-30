
<template>
  <v-layout class="container" align-center justify-space-between column fill-height>
    <br>
    <br>
    <h1 class="display-2 font-weight-thin mb-3">Mini Overflow</h1>
    <h4 class="subheading">simple q&a web-app built with vue</h4>
    <br>
    <br>
    <br>
    <v-form v-if="showForm=='signup'">
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="email" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" label="Password" required></v-text-field>
      <v-btn @click="register">Create Account</v-btn>
      <v-btn flat @click="SigningIn">Sign In</v-btn>
    </v-form>

    <v-form v-if="showForm=='signin'">
      <v-text-field v-model="email" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" label="Password" required></v-text-field>
      <v-btn flat @click="SigningUp">Create account</v-btn>
      <v-btn @click="signIn">Sign In</v-btn>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      showForm: "signup",
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    SigningIn() { 
      this.showForm="signin";
    },
    SigningUp(){
      this.showForm="signup";
    },
    register(){
      let user = {
        username: this.username,
        email: this.email,
        password: this.password 
      }

      this.$store.dispatch('createUser', user)
    },
    signIn(){
      let user = {
        email: this.email, 
        password: this.password
      }

      this.$store.dispatch('userLogin', user)
    }
  }
};
</script>

<style>
</style>
