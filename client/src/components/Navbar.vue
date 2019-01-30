<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text font-weight-regular">MINI OVERFLOW</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-form>
      <v-container>
        <v-text-field>
          <template slot="label">Search question ...
            <v-icon style="vertical-align: middle; padding-left: 26px;">search</v-icon>
          </template>
        </v-text-field>
      </v-container>
    </v-form>

    <v-btn icon @click="signOut">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: "Navbar",
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    signOut(){
      swal("are you sure you want to sign out?", {
        buttons: {
          cancel: true,
          signOut: {
            text: "Sign Out",
            value: "signOut"
          }
        }
      })
      .then(value => {
        if(value == "signOut"){
          this.$store.dispatch('signOut')
        }
      })
    }
  }
};
</script>

<style>
</style>
