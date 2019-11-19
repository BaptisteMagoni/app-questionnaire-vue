<template>
    <div class="information" style="margin-top: 30px;">
        <div class="container h-100">
            <div class="d-flex justify-content-center h-100">
                <div class="user_card">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="../content/loginlogo.png" class="brand_logo" alt="Logo">
                        </div>
                    </div>

                        <div class="d-flex justify-content-center form_container">
                            <form>
                                <div class="input-group mb-3" v-if="admin == false">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" name="form-firstname" v-model="prenom" class="form-control input_user" value="" placeholder="Prénom" >
                                </div>
                                <div class="input-group mb-3" v-if="admin == false">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" name="form-lastname" v-model="nom" class="form-control input_pass" value="" placeholder="Nom">
                                </div>
                                <div class="input-group mb-3" v-if="admin == false">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-building"></i></span>
                                    </div>
                                    <input type="text" name="form-company" v-model="societe" class="form-control input_pass" value="" placeholder="Nom de la société">
                                </div>
                                <div class="input-group mb-3" v-if="admin == true">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" name="form-company" v-model="mdpAdmin" class="form-control input_pass" value="" placeholder="Mot de passe ...">
                                </div>
                                <button v-if="admin == true" type="button" v-on:click="redirectAdminPage()" class="btn btn-secondary form-control">Se connecter</button>
                                <button v-if="admin == false" type="button" name="btn" v-on:click="addDB(prenom, nom, societe)" class="btn btn-secondary form-control">Commencer le test</button>

                                <p style="text-align: center; margin-top: 10px;"><input type="checkbox" value="Admin" name="adm" v-on:click="changeConnect()" class="form-check-input">
                                <label for="adm" style="color: white" class="form-check-label"> Admin</label></p>
                            </form>
                        </div>
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
      admin: false,
      prenom: '',
      nom: '',
      societe: '',
      mdpAdmin: '',
      btnState: false
    }
  },
  methods: {
    // Permet d'ajouter un nouveau utilisateurs dans la bdd - 28/10/2019
    addDB: function (prenom, nom, societe) {
      var id = new Date().toISOString().replace('-', '')
      var vm = this
      var user = {
        _id: id, // Récupérer la date en temps réel : 28/10/2019
        prenom: prenom,
        nom: nom,
        societe: societe,
        score: 0,
        questions: ''
      }
      if (user.prenom !== '' && user.nom !== '' && user.societe !== '') { // Vérifier si les inputs ne sont pas null
        db.put(user).then(function (doc) {
          vm.$router.push({ // Permet de rediriger vers la page questionnaire
            name: 'questionnaire',
            params: {
              user: id
            }
          })
        })
        db.replicate.to(url) // Envoie dans la base de données
      }
    },
    // Permet de changer de mode de connexion
    changeConnect: function () {
      if (this.admin) {
        this.admin = false;
      } else {
        this.admin = true;
      }
    },
    // Permet de faire une redirection vers la page admin
    redirectAdminPage: function () {
      if (this.mdpAdmin === 'admin') {
        this.$router.push({
          name: 'admin'
        })
      }
    }
  }
}

</script>

<style scoped>

</style>
