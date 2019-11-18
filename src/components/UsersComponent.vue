<template>
    <div class="users">
        <a v-on:click="redirectAdminPage()" style="float: right; font-size: 20px; margin-bottom: 20px; margin-right: 50px;"><i class="fas fa-arrow-circle-left"> Retour</i></a>
        <table class="table table-hover table-dark">
            <thead>
            <tr style="text-align: center;">
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Entreprise</th>
                <th scope="col">Score</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.doc._id" style="text-align: center;">
                <td scope="row">{{user.doc.prenom}}</td>
                <td>{{user.doc.nom}}</td>
                <td>{{user.doc.societe}}</td>
                <td>{{user.doc.score}}</td>
                <td><button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#'+user.doc.nom+user.doc.prenom">Détails</button></td>

                <!-- Modal -->
                <div class="modal fade" :id="user.doc.nom+user.doc.prenom" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle" style="color: black;">Utilisateur {{user.doc.nom}} {{user.doc.prenom}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table table-dark">
                                    <thead>
                                        <tr style="color: black">
                                            <th scope="col">Question</th>
                                            <th scope="col">Résultat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="response in user.doc.questions" :key="response.result" style="color: black">
                                            <th scope="row">{{response.question}}</th>
                                            <td v-if="response.result == true">+1</td>
                                            <td v-if="response.result == false">+0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import PouchDB from 'pouchdb'
import json from '../content/question.json'
var db = new PouchDB('http://localhost:5984/users')
export default {
  name: 'UsersComponent',
  json_quest: json,
  count: 1,
  data: () => {
    return {
      users: null
    }
  },
  methods: {
    // Permet de faire une redirection vers la page Admin - 18/11/2019
    redirectAdminPage: function () {
      this.$router.push({
        name: 'admin'
      })
    }
  },
  // Permet de lancer cette fonction lors du chargement de la page - 18/11/2019
  created: function () {
    var self = this
    db.allDocs({
      include_docs: true,
      descending: true
    }).then(function (doc) {
      self.users = doc.rows
    })
  }
}

</script>

<style scoped>

</style>
