<template>
  <div>
    <v-card>
      <v-layout align-center justify-space-between row>
        <h1 class="display-1 font-weight-regular mt-4 mb-3">{{question.title}}</h1>
        <v-layout align-center justify-end row>
          <v-btn @click="deleteQuestion" class="mt-2" color="red lighten-2 white--text">Delete</v-btn>
          <v-btn class="mt-2" color="blue-grey white--text" @click="closeQuestion">back to home</v-btn>
        </v-layout>
      </v-layout>
      <br>
      <v-layout align-left justify-space-between row>
        <p class="title font-weight-light">{{question.description}}</p>
      </v-layout>
      <br>
      <v-layout align-center justify-left row>
        <div>
          <p class="mb-0">{{question.upvote}}</p>
          <v-btn @click="upvoteQuestion" flat icon color="blue lighten-2" class="mt-0">
            <v-icon>thumb_up</v-icon>
          </v-btn>
        </div>
        <div>
          <p class="mb-0">{{question.downvote}}</p>
          <v-btn @click="downvoteQuestion" flat icon color="red lighten-2" class="mt-0">
            <v-icon>thumb_down</v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-card>
    <hr>

    <div>
      <h1 class="headline font-weight-light ml-2 mt-4 mb-3 text-xs-left">Your Answer</h1>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="answerTitle"
              outline
              label="Write the title of your answer"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              v-model="answerDescription"
              outline
              auto-grow
              label="Describe your answer in details"
              required
            ></v-textarea>
          </v-flex>
          <v-btn
            color="blue darken-1 white--text"
            @click="createAnswer({title: answerTitle, description: answerDescription, questionId: question._id})"
          >Submit</v-btn>
        </v-layout>
      </v-container>
      <hr>
      <h1
        class="headline font-weight-light ml-2 mt-4 mb-3 text-xs-left"
      >{{currentAnswer.length}} Answers</h1>
    </div>
    <div v-for="currentAnswer in currentAnswer">
      <Answer @get-answer="getCurrentAnswer" :answer="currentAnswer"/>
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
import swal from "sweetalert";
import Answer from "@/components/Answer.vue";

export default {
  name: "Question",
  components: {
    Answer
  },
  data() {
    return {
      question: this.$store.state.openQuestion,
      currentAnswer: this.$store.state.currentAnswer,
      answerTitle: "",
      answerDescription: ""
    };
  },
  methods: {
    closeQuestion() {
      this.$store.dispatch("closeQuestion");
    },
    createAnswer(newAnswer) {
      this.$store.dispatch("createAnswer", newAnswer);
    },
    getCurrentAnswer() {
      this.$store.dispatch("getCurrentAnswer", this.question._id);
    },
    deleteQuestion() {
      axios
        .delete(`http://localhost:3000/questions/${this.question._id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(res => {
          swal({
            title: "Delete Success",
            icon: "success"
          });
        })
        .then(() => {
          this.$emit("back-to-home");
        })
        .catch(err => {
          swal({
            title: "Oops!",
            text: err.response.data.message,
            icon: "error"
          });
        });
    },
    upvoteQuestion() {
      axios
        .put(
          `http://localhost:3000/questions/upvote/${this.question._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          this.$emit("back-to-home");
        })
        .catch(err => {
          console.log(err.response);
          swal({
            title: "Oops!",
            text: err.response.data.msg,
            icon: "error"
          });
        });
    },
    downvoteQuestion() {
      axios
        .put(
          `http://localhost:3000/questions/downvote/${this.question._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          this.$emit("back-to-home");
        })
        .catch(err => {
          console.log(err.response);
          swal({
            title: "Oops!",
            text: err.response.data.msg,
            icon: "error"
          });
        });
    }
  },
  created() {
    this.getCurrentAnswer();
    this.question = this.$store.state.openQuestion;
  },
  computed: {
    watchCurrentAnswer() {
      this.currentAnswer = this.$store.state.currentAnswer;
      this.question = this.$store.state.openQuestion;
    }
  },
  watch: {
    watchCurrentAnswer(v) {
      console.log("watching current answer");
    }
  }
};
</script>

<style>
</style>
