<template>
  <div class="home">
    <Auth v-if="isLogin==false"/>
    <div class="after-login" v-if="isLogin==true">
      <Navbar/>
      <Content v-if="openQuestion==false"/>
      <Question v-if="openQuestion!==false"/>
    </div>
  </div>  
</template>

<script>
// @ is an alias to /src
import Auth from "@/components/Auth.vue";
import Navbar from "@/components/Navbar.vue";
import Content from "@/components/Content.vue";
import Question from "@/components/Question.vue"

export default {
  name: "home",
  data() {
    return {
      isLogin: this.$store.state.isLogin,
      openQuestion: false
    };
  },
  components: {
    Auth,
    Navbar,
    Content,
    Question
  },
  computed: {
    LoginUser() {
      this.isLogin = this.$store.state.isLogin;
    },
    currentQuestion(){
      this.openQuestion = this.$store.state.openQuestion 
    }
  },
  watch: {
    LoginUser(v) {
      console.log("watch login state");
    },
    currentQuestion(v){
      console.log("opening a question")
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.isLogin = true
    }
  }
};
</script>
