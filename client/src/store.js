import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import { stat } from 'fs';

Vue.use(Vuex) 

var server = "http://localhost:3000"

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    openQuestion: false,
    currentAnswer: []
  },
  mutations: {
    authenticateUser(state) {
      state.isLogin = true
    },
    userSignout(state) {
      state.isLogin = false
    },
    mutateGetQuestions(state, arrQuestions) {
      state.questions = arrQuestions
    },
    addQuestion(state, objQuestion) {
      state.questions.unshift(objQuestion)
    },
    openingQuestion(state, objQuestion) {
      state.openQuestion = objQuestion
    },
    closingQuestion(state) {
      state.openQuestion = false
    },
    getCurrentAnswer(state, arrAnswer) {
      state.currentAnswer = arrAnswer
    },
    addAnswer(state, objAnswer) {
      state.currentAnswer.unshift(objAnswer)
    }
  },
  actions: {
    createUser({ commit }, objUser) {
      axios
        .post(`${server}/users`, objUser)
        .then(res => {
          localStorage.setItem('token', res.data.token)
          console.log(res)
          commit('authenticateUser')
        })
        .catch(err => {
          if (err.response.data.err.errors.username) {
            swal({
              title: "Oops!",
              text: err.response.data.err.errors.username.message,
              icon: "error",
            });
          } else if (err.response.data.err.errors.email) {
            swal({
              title: "Oops!",
              text: err.response.data.err.errors.email.message,
              icon: "error",
            });
          } else if (err.response.data.err.errors.password) {
            swal({
              title: "Oops!",
              text: err.response.data.err.errors.password.message,
              icon: "error",
            });
          } else {
            swal({
              title: "Oops!",
              text: "please try again",
              icon: "error",
            });
          }
        })
    },
    userLogin({ commit }, objUser) {
      axios
        .post(`${server}/users/login`, objUser)
        .then(res => {
          localStorage.setItem('token', res.data.access_token)
          commit('authenticateUser')
          console.log(this.state.isLogin)
        })
        .catch(err => {
          swal({
            title: "Oops!",
            text: err.response.data.message,
            icon: "error",
          })
        })
    },
    signOut({ commit }) {
      localStorage.removeItem('token')
      commit('userSignout')
    },
    getQuestions({ commit }) {
      axios
        .get(`${server}/questions`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(res => {
          commit('mutateGetQuestions', res.data.questions)
          console.log(this.state.questions)
        })
        .catch(err => {
          swal({
            title: "Oops!",
            text: err.response.data.message,
            icon: "error",
          })
        })
    },
    createQuestion({ commit }, objQuestion) {
      axios
        .post(`${server}/questions`, objQuestion, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(res => {
          commit('addQuestion', res.data.question)
          console.log("create question success ==> ", this.state.questions)
        })
        .catch(err => {
          swal({
            title: "Oops!",
            text: err.response.data.message,
            icon: "error",
          })
        })
    },
    openQuestion({ commit }, objQuestion) {
      commit('openingQuestion', objQuestion)
      console.log(this.state.openQuestion)
    },
    closeQuestion({ commit }) {
      commit('closingQuestion')
    },
    getCurrentAnswer({ commit }, questionId) {
      axios
        .get(`${server}/answers/${questionId}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(res => {
          commit('getCurrentAnswer', res.data.answers)
        })
        .catch(err => {
          swal({
            title: "Oops!",
            text: err.response.data.message,
            icon: "error",
          })
        })
    },
    createAnswer({ commit }, objAnswer) {
      if (!objAnswer.title) {
        swal({
          title: "Oops!",
          text: "please fill your answer title",
          icon: "error",
        })
      } else {
        let body = {
          title: objAnswer.title,
          description: objAnswer.description
        }

        axios
          .post(`${server}/answers/${objAnswer.questionId}`, body, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(res => {
            commit('addAnswer', res.data.newAnswer)
          })
          .catch(err => {
            swal({
              title: "Oops!",
              text: err.response.data.message,
              icon: "error",
            })
          })

      }
    },
    search({commit}, objQuestion){
      axios
        .get(`${server}/questions/search?q=${objQuestion}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(res => {
          commit('mutateGetQuestions', res.data.questions)
          console.log(this.state.questions)
        })
        .catch(err => {
          swal({
            title: "Oops!",
            text: err.response.data.message,
            icon: "error",
          })
        })
    }
  }
})
