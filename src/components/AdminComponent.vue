<template>
    <div class="admin" style="margin-top: 30px">
        <div class="container h-100">
            <div class="d-flex justify-content-center h-100">
                <div class="user_card">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="../content/useradmin.png" class="brand_logo" alt="Logo">
                        </div>
                    </div>

                    <div class="d-flex justify-content-center form_container">
                        <form>
                            <div class="input-group mb-3">
                                <button type="button" class="btn btn-secondary form-control" data-toggle="modal" data-target="#modalNbQuestion">Modification du nombre de question</button>
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="modalNbQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Modification du nombre de question</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form style="align-items: center">
                                                <div class="form-group" align="center">
                                                    <label for="formGroupExampleInput">Le nombre de question actuel est de {{nbActualQuestion}}</label>
                                                    <input type="number" class="form-control" id="formGroupExampleInput" v-model="nbQuestion" placeholder="Nombre de question">
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                            <button type="button" class="btn btn-primary" v-on:click="saveNbQuestion()">Enregistrer vos modification</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <button type="button" class="btn btn-secondary form-control" v-on:click="redirectResponseUsers()">Réponses</button>
                            </div>
                            <div class="input-group mb-3">
                                <button type="button" class="btn btn-danger form-control" v-on:click="deconnectionAdmin()">Déconnexion</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PouchDB from 'pouchdb' // Import de pouchdb

var db = new PouchDB('http://localhost:5984/config') // Instanciation de PouchDB

export default {

  name: 'AdminComponent',
  data: () => {
    return {
      nbQuestion: 0, // Variable pour le nombre de question - 18/11/2019
      nbActualQuestion: 0 // Variable pour le nombre actuel de question - 18/11/2019
    }
  },
  methods: {
    // Permet de sauvegarder le nombre de question entré par l'utilisateur - 18/11/2019
    saveNbQuestion: function () {
      var self = this
      console.log('Save nb')
      db.get('a45067be05ced19ec4fde4e0d2000ce0').then(function (doc) { // Permet de récupérer le json depuis pouchdb - 18/11/2019
        console.log(doc)
        doc.nbQuestions = self.nbQuestion
        return db.put(doc) // Permet de modifier le json - 18/11/2019
      })
      location.reload() // Permet de reload la page - 18/11/2019
    },
    // Permet de rediriger vers la page users - 18/11/2019
    redirectResponseUsers: function () {
      this.$router.push({
        name: 'users'
      })
    },
    // Permet de rediriger vers la page admin - 18/11/2019
    deconnectionAdmin: function () {
      this.$router.push({
        name: 'information'
      })
    }
  },
  // Permet de lancer cette fonction lors du chargement de la page - 18/11/2019
  created: function () {
    var self = this
    db.get('a45067be05ced19ec4fde4e0d2000ce0').then(function (doc) {
      self.nbQuestion = doc.nbQuestions
      self.nbActualQuestion = doc.nbQuestions
    })
  }
}
</script>

<style scoped>

</style>
