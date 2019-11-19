<template>
    <div class="questionnaire" style="margin-top: 30px">
        <div class="container h-100">
            <div class="d-flex justify-content-center h-100">
                <div class="user_card" style="width: 800px" v-if="isFinish == false">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="../content/logo.png" class="brand_logo" alt="Logo">
                        </div>
                    </div>
                    <div class="container">
                        <p style="text-align: center; color: white; margin-top: 50px; ">Question {{step}}/{{maxQuestion}} : {{questions[step - 1].question}}</p>
                        <div class="input-group" v-for="response in questions[step - 1].data" v-bind:key="response.response" style="padding-bottom: 10px;">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" aria-label="Radio button for following text input" v-on:click="addResponseUserCheckBox(response, response.response)" :name="'button_' + response.step " value="Valider">
                                </div>
                            </div>
                            <input type="text" class="form-control" aria-label="Text input with radio button" :value="response.response" disabled>
                        </div>
                        <button type="button" v-on:click="registerQuestion()" class="btn btn-secondary form-control">Valider</button>
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
      score: 0,
      selected: null,
      userresponse: null
    }
  },
  methods: {
    // Permet de récupérer l'id de l'utilisateur depuis la base de données - 28/10/2019
    user: function () {
      return this.$route.params.user
    },
    // Permet d'enregistrer le score de l'utilisateur à chaque fois qu'il valide une proposition - 18/11/2019
    registerQuestion: function () {
      var response = this.selected
      if (response != null) {
        if (response.good) {
          this.score += 1
        }

        this.items = {
          id: this.questions[this.step - 1].id,
          result: response.good,
          question: this.questions[this.step - 1].question,
          resp: this.userresponse
        }
        this.resultUser.push(this.items)
        if (this.step >= this.maxQuestion) {
          this.isFinish = true
          this.addDbResult()
        } else {
          this.step += 1
        }
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
    getRandomInt: function (max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    getNbQuestion: function () {
      return this.questions.length
    },
    // Permet de rediriger vers la page principale du site - 18/11/2019
    redirectHome: function () {
      this.$router.push({
        name: 'information'
      })
    },
    addResponseUserCheckBox: function (response, userresponse) {
      this.selected = response
      this.userresponse = userresponse
    }
  },
  // Permet de lancer la fonction lors du chargement de la page - 18/11/2019
  created: function () {
    var self = this
    // Récupère le nombre de question max saisie par l'admin - 19/11/2019
    dbConfig.get('a45067be05ced19ec4fde4e0d2000ce0').then(function (doc) {
      self.maxQuestion = doc.nbQuestions
    }).then(function () { // Permet d'attendre l'action d'avant - 19/11/2019
      var nbQuestion = self.getNbQuestion() // Récupère le nombre de question en tout - 19/11/2019
      if (self.maxQuestion > nbQuestion) { // Vérifie si le nombre saisie par l'utilisateur n'est pas supérieur au nombre de question qui éxiste - 19/11/2019
        self.maxQuestion = nbQuestion // Si c'est le cas maxQuestion prend la valeur du nombre total des question
      }
    })
  }
}
</script>

<style scoped>

</style>
