<template>
  <v-card>
    <v-divider></v-divider>
    <v-layout align-center justify-space-between column fill-height>
      <h1 class="display-1 font-weight-light ml-2 mt-4 mb-3">{{answer.title}}</h1>
      <h1 class="title font-weight-light ml-2 mt-4 mb-3">{{answer.description}}</h1><br>
      <v-layout align-center justify-end row fill-height>
        <div class="mr-3">
          <p>0</p>
          <v-icon>thumb_up</v-icon>
        </div>
        <div class="mr-3">
          <p>0</p>
          <v-icon>thumb_down</v-icon>
        </div>
        <div class="mr-3">
          <p>0</p>
          <v-icon>question_answer</v-icon>
        </div>
      </v-layout>
    </v-layout>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "Answer",
  props: ['answer']
};
</script>

<style>
</style>
