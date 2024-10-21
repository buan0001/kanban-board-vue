<template>
  <v-app class="bg-green-lighten-4">
    <v-main>
      <v-app-bar class="bg-lime-lighten-4 " :elevation="2" rounded >
        <v-app-bar-title class="text-body-4 d-flex justify-center">Kanban board in made in Vue</v-app-bar-title>

      </v-app-bar>
      <router-view />
    </v-main>
    <v-row align="center" justify="center">
    <v-footer class="bg-red-lighten-5 text-body-1 d-flex justify-center">
      <p class="">Made by Buan</p> </v-footer>
  </v-row>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
