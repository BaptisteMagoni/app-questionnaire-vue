<template>
  <v-app>
    <div id="app">
      <div id="nav"></div>
      <Information/>
      <router-view/>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>
