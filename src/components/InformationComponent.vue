<template>
    <div class="information">
        <div class="container h-100">
            <div class="d-flex justify-content-center h-100">
                <div class="user_card">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="../content/logo.png" class="brand_logo" alt="Logo">
                        </div>
                    </div>

                        <div class="d-flex justify-content-center form_container">
                            <form>
                                <div class="input-group mb-3">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" name="form-firstname" v-model="prenom" class="form-control input_user" value="" placeholder="Prénom">
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" name="form-lastname" v-model="nom" class="form-control input_pass" value="" placeholder="Nom">
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-building"></i></span>
                                    </div>
                                    <input type="text" name="form-company" v-model="societe" class="form-control input_pass" value="" placeholder="Nom de la société">
                                </div>
                                <button type="button" value="Commencer le test" v-on:click="addDB(prenom, nom, societe)" class="btn btn-secondary form-control"></button>
                            </form>
                        </div>

                    <!--<div class="mt-4">
                        <div class="d-flex justify-content-center links">
                            Don't have an account? <a href="#" class="ml-2">Sign Up</a>
                        </div>
                        <div class="d-flex justify-content-center links">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PouchDB from 'pouchdb'
var db = new PouchDB('users') // Création de la connection à la BDD : 28/10/2019
var url = 'http://localhost:5984/users' // Initialisation de l'url de ma base de données : 28/10/2019

export default {
  name: 'InformationComponent',
  data: () => {
    return {
      prenom: '',
      nom: '',
      societe: '',
      administrateur: false
    }
  },
  methods: {
    addDB: function (prenom, nom, societe) {
      var id = new Date().toISOString()
      var vm = this
      var user = {
        _id: id, // Récupérer la date en temps réel : 28/10/2019
        prenom: prenom,
        nom: nom,
        societe: societe,
        administrateur: false
      }
      db.put(user).then(function (doc) {
        console.log(doc) // Affichage dans la console si l'utilisateur à bien été enregistré
        vm.$router.push({
          name: 'questionnaire',
          params: {
            user: id
          }
        })
      })
      db.replicate.to(url)
    }
  }
}

</script>

<style scoped>

</style>
