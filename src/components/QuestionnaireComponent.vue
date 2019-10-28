<template>
    <div class="questionnaire">
        <template>
            <v-stepper v-model="e1">
                <v-stepper-header >

                    <v-stepper-step v-for="question in questions" v-bind:key="question" :step="increment(index)" >{{question.title}}</v-stepper-step>

                    <v-divider></v-divider>

                    <!--<v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Name of step 3</v-stepper-step>-->
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content v-for="question in questions" v-bind:key="question" step="1">
                        <v-card
                                class="mb-12"
                                color="grey lighten-1"
                                height="200px"
                        ></v-card>

                        <v-btn
                                color="primary"
                                @click="e1 = 2"
                        >
                            Continue
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card
                                class="mb-12"
                                color="grey lighten-1"
                                height="200px"
                        ></v-card>

                        <v-btn
                                color="primary"
                                @click="e1 = 3"
                        >
                            Continue
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </template>
    </div>
</template>

<script>
export default {
  name: 'QuestionnaireComponent',
  data () {
    return {
      e1: 0,
      index: 1,
      questions: [
        {
          'id': 1,
          'title': 'Question 1',
          'data': 'Quelle est la taille de mon pénis ?'
        },
        {
          'id': 2,
          'title': 'Question 2',
          'data': 'Quelle est votre durée pour un rapport sexuel'
        }
      ]
    }
  },
  methods: {
   user: function () {
     return this.$route.params.user
   },
    increment: function (index) {
      return index + 1
    }
  }
}
</script>

<style scoped>

</style>
