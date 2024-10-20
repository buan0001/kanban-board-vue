<script setup lang="ts">
import { ref } from "vue";
import type { Card } from "@/types/Card";

const { submit, cardToUpdate = { title: "", body: "", id: 0 } } = defineProps<{
  submit: Function;
  cardToUpdate: Card;
}>();



const isDialogOpen = defineModel("isOpen", { default: false });


function addNewCard() {
  isDialogOpen.value = false;
  console.log("submit:", cardToUpdate);

  if (submit) {
    submit({ title: cardToUpdate.title.value, body: body.value });
  }
}
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="isDialogOpen" width="auto">
      <v-card title="Add a new task">
        <div class="ma-5">
          <v-text-field
            label="Name of the new task"
            v-model="cardToUpdate.title"
          ></v-text-field>

          <v-textarea label="Details" v-model="cardToUpdate.body"></v-textarea>
        </div>
        <v-divider></v-divider>
        <template v-slot:actions>
          <v-btn
            variant="outlined"
            text="Close"
            @click="isDialogOpen = false"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            color="primary"
            text="Submit"
            @click="addNewCard"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
