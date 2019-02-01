<template>
  <div class="content">
    <v-card>
      <v-layout align-center justify-space-between row>
        <h1 class="display-1 font-weight-thin mt-4 mb-3">Top Questions</h1>
        <v-layout row justify-end>
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-btn slot="activator" class="mt-2" color="blue-grey white--text">ask a question</v-btn>
            <AddQuestion @close-dialog="closeDialog" @add-question="addQuestion($event)"/>
          </v-dialog>
        </v-layout>
      </v-layout>
    </v-card>
    <hr>

    <div v-for="question in questions">
      <v-card>
        <v-divider></v-divider>
        <v-layout align-center justify-space-between row>
          <h1 class="title font-weight-light ml-2 mt-4 mb-3"><v-btn flat @click="openQuestion(question)">{{question.title}}</v-btn></h1>
          <v-layout align-center justify-end row fill-height>
            <div class="mr-3">
              <p>{{question.upvote}}</p>
              <v-icon>thumb_up</v-icon>
            </div>
            <div class="mr-3">
              <p>{{question.downvote}}</p>
              <v-icon>thumb_down</v-icon>
            </div>
            <div class="mr-3">
              <p>{{question.answers.length}}</p>
              <v-icon>question_answer</v-icon>
            </div>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </div>
  </div>
</template> 

<script>
import AddQuestion from "@/components/createQuestion.vue";

export default {
  name: "Content",
  components: {
    AddQuestion
  },
  data() {
    return {
      questions: this.$store.state.questions,
      dialog: false
    };
  },
  methods: {
    dispacthGetQuestions() {
      this.$store.dispatch("getQuestions");
    },
    closeDialog() {
      this.dialog = false;
    },
    addQuestion(question){
      this.dialog = false;
      this.$store.dispatch('createQuestion', question)
    }, 
    openQuestion(question){
      this.$store.dispatch('openQuestion', question)
    }
  },
  created() {
    this.dispacthGetQuestions();
  },
  computed: {
    watchGetUser() {
      this.questions = this.$store.state.questions;
    }
  },
  watch: {
    watchGetUser(v) {
      console.log("at home ==> ", this.questions);
    }
  }
};
</script>

<style>
</style>
