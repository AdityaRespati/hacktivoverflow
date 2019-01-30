<template>
  <v-card>
    <v-card-title>
      <span class="headline">What do you want to ask?</span>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="$emit('close-dialog')">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click="$emit('add-question', {title, description})">Submit</v-btn>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field v-model="title" solo label="Write the title of your question" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea v-model="description" solo auto-grow label="Describe your question in details" required></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name:"AddQuestion",
  data(){
    return{
      title: "",
      description: ""
    }
  }
};
</script>

<style>
</style>
