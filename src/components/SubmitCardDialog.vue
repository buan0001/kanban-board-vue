<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Card } from "@/types/Card";

const { submit, cardToUpdate = { title: "", body: "", id: 0 } } = defineProps<{
  submit?: Function;
  cardToUpdate?: Card;
}>();

const title = ref(cardToUpdate?.title || '')
const body = ref(cardToUpdate?.body || '')
const isUpdate = computed(() => cardToUpdate.id ? true : false)

const isDialogOpen = defineModel("isOpen", { default: false });

console.log("Card to update:",cardToUpdate);

watch(() => cardToUpdate, (newCard) => {
  console.log("New card:",newCard);
  
  if (newCard) {
    title.value = newCard.title;
    body.value = newCard.body;
  }
});

function addNewCard() {
  isDialogOpen.value = false;
  console.log("submit:", cardToUpdate);
  if (submit) {
    submit({ title, body, id: cardToUpdate.id });
  }
}
</script>

<!-- <template>
  <div class="text-center pa-4">
    <v-dialog v-model="isDialogOpen" width="auto">

      <v-card>
        <v-card-title>{{ isUpdate ? 'Update Card' : 'Create Card' }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="title" label="Title" required></v-text-field>
            <v-textarea v-model="body" label="Body" required></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="isDialogOpen = false">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="addNewCard">{{ isUpdate ? 'Update' : 'Create' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template> -->
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
