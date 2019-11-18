<template>
    <div class="questionnaire" style="margin-top: 30px">
        <div class="container h-100">
            <div class="d-flex justify-content-center h-100">
                <div class="user_card" style="width: 550px" v-if="isFinish == false">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="../content/logo.png" class="brand_logo" alt="Logo">
                        </div>
                    </div>
                    <div class="container">
                        <p style="text-align: center; color: white; margin-top: 50px; ">Question {{step}}/{{maxQuestion}} : {{questions[step - 1].question}}</p>
                        <div class="input-group" v-for="response in questions[step].data" v-bind:key="response.response" style="padding-bottom: 10px;">
                            <input type="text" class="form-control" aria-label="Text input with radio button" :value="response.response" disabled>
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="button" aria-label="Radio button for following text input" v-on:click="registerQuestion(response)" :name="'button_' + response.step " value="Valider">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="user_card" style="width: 550px" v-if="isFinish == true">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="../content/logo.png" class="brand_logo" alt="Logo">
                        </div>
                    </div>
                    <div class="container">
                        <p style="color: white; text-align: center;">Score : {{score}}/{{maxQuestion}}</p>
                        <div class="input-group mb-3">
                            <button type="button" class="btn btn-secondary form-control" v-on:click="redirectHome()">Retourner au menu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import json from '../content/question.json'
import PouchDB from 'pouchdb'

var db = new PouchDB('http://localhost:5984/users')
var dbConfig = new PouchDB('http://localhost:5984/config')
export default {
  name: 'QuestionnaireComponent',
  data () {
    return {
      step: 1,
      response: '',
      questions: json,
      resultUser: [],
      items: {},
      maxQuestion: 0,
      isFinish: false,
      score: 0
    }
  },
  methods: {
    // Permet de récupérer l'id de l'utilisateur depuis la base de données - 28/10/2019
    user: function () {
      return this.$route.params.user
    },
    // Permet d'enregistrer le score de l'utilisateur à chaque fois qu'il valide une proposition - 18/11/2019
    registerQuestion: function (response) {
      if (response.good) {
        this.score += 1
      }

      this.items = {
        id: this.questions[this.step - 1].id,
        result: response.good,
        question: this.questions[this.step - 1].question
      }
      this.resultUser.push(this.items)
      if (this.step >= this.maxQuestion) {
        this.isFinish = true
        this.addDbResult()
      } else {
        this.step += 1
      }
    },
    // Permet d'ajouter le résultat dans la base de données - 18/11/2019
    addDbResult: function () {
      var self = this
      db.get(this.user()).then(function (doc) {
        doc.score = self.score
        doc.questions = self.resultUser
        return db.put(doc)
      })
    },
    // Permet de rediriger vers la page principale du site - 18/11/2019
    redirectHome: function () {
      this.$router.push({
        name: 'information'
      })
    }
  },
  // Permet de lancer la fonction lors du chargement de la page - 18/11/2019
  created: function () {
    var self = this
    dbConfig.get('a45067be05ced19ec4fde4e0d2000ce0').then(function (doc) {
      self.maxQuestion = doc.nbQuestions
    })
  }
}
</script>

<style scoped>

</style>
