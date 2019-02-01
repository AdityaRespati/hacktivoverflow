<template>
  <v-card>
    <v-divider></v-divider>
    <v-layout align-center justify-space-between row>
      <v-layout align-start justify-start column>
        <h1 class="headline font-weight-light ml-3 mt-4 mb-3">{{answer.title}}</h1>
        <h1 class="subheading font-weight-light ml-3 mt-1 mb-3">{{answer.description}}</h1>
      </v-layout>
      <v-layout align-center justify-end row fill-height>
        <div class="mr-3">
          <p class="mt-0">{{answer.upvote}}</p>
          <v-btn icon @click="upvoteAnswer">
            <v-icon>thumb_up</v-icon>
          </v-btn>
        </div>
        <div class="mr-4">
          <p>{{answer.downvote}}</p>
          <v-btn icon @click="downvoteAnswer">
            <v-icon>thumb_down</v-icon>
          </v-btn>
        </div>
        <v-btn @click="deleteAnswer()" class="mt-2" color="red lighten-2 white--text">Delete</v-btn>
      </v-layout>
    </v-layout>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "Answer",
  props: ["answer"],
  methods: {
    deleteAnswer() {
      axios
        .delete(`http://localhost:3000/answers/${this.answer._id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(res => {
          this.$emit("get-answer");
        })
        .catch(err => {
          swal({
            title: "Oops! Something went wrong",
            text: err.response.data.message,
            icon: "error"
          });
        });
    },
    upvoteAnswer() {
      axios
        .put(
          `http://localhost:3000/answers/upvote/${this.answer._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          this.$emit("get-answer");
        })
        .catch(err => {
          swal({
            title: "Oops! Something went wrong",
            text: err.response.data.message,
            icon: "error"
          });
        });
    },
    downvoteAnswer(){
         axios
        .put(
          `http://localhost:3000/answers/downvote/${this.answer._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          this.$emit("get-answer");
        })
        .catch(err => {
          swal({
            title: "Oops! Something went wrong",
            text: err.response.data.msg,
            icon: "error"
          });
        });
    }
  }
};
</script>

<style>
</style>
