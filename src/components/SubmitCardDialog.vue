<script setup lang="ts">
import { ref } from "vue";
import type { Card } from "@/types/Card";

const { submit, cardToUpdate = { title: "", body: "", id: 0 } } = defineProps<{
  submit?: Function;
  cardToUpdate?: Card;
}>();

const title = ref(cardToUpdate?.title || '')
const body = ref(cardToUpdate?.body || '')
const isUpdate = cardToUpdate.id ? true : false

const isDialogOpen = defineModel("isOpen", { default: false });

console.log("Card to update:",cardToUpdate);


function addNewCard() {
  isDialogOpen.value = false;
  console.log("submit:", cardToUpdate);
  if (submit) {
    submit({ title, body, id: cardToUpdate.id });
  }
}
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="isDialogOpen" width="auto">
      <v-card >
        <v-card-title> {{ isUpdate ? "Update" : "Create" }} card</v-card-title>
        <div class="ma-5">
          <v-text-field
            label="Name of the new task"
            v-model="title"
          ></v-text-field>

          <v-textarea label="Details" v-model="body"></v-textarea>
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
            text="Confirm"
            @click="addNewCard"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
