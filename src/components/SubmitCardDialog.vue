<script setup lang="ts">
import { ref, computed, watch, watchEffect } from "vue";
import type { Card } from "@/types/Card";

// const emit = defineEmits<{
//   submit: [string] 
// }>()
const submit = defineEmits(['submit']);

const title = ref('')
const body = ref('')

const isDialogOpen = defineModel("isOpen", { default: false });
const props = defineProps<{cardToUpdate: Card}>()
// const cardToUpdate = defineProps<{card: Card}>()
// const cardToUpdate = defineModel<Card>("cardToUpdate")
const isUpdate = computed(() => props.cardToUpdate.id ? true : false)


watch(props, (newCard) => {
  if (newCard) {
    title.value = newCard.cardToUpdate.title;
    body.value = newCard.cardToUpdate.body;
    console.log("title:", title.value);
  }
  console.log("new card:", newCard.cardToUpdate);
}, { immediate: true });

function addNewCard() {
  console.log("Submitting:");
  console.log("title :", title.value);
  console.log("body :", body.value);
  console.log("cardToUpdate :", props.cardToUpdate);
  if (submit) {
    submit('submit',{ title:title.value, body:body.value, id: props.cardToUpdate.id });
    // submit('submit',{ title, body, id: props.value?.id });
  }
  clear()
}

function clear(){
  isDialogOpen.value = false;
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
            label="Name of the task"
            v-model="title"
          ></v-text-field>

          <v-textarea label="Details" v-model="body"></v-textarea>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
        <!-- <template v-slot:actions> -->
          <v-btn
            variant="outlined"
            text="Close"
            @click="clear"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            color="primary"
            text="Confirm"
            @click="addNewCard"
          ></v-btn>
        </v-card-actions>
        <!-- </template> -->
      </v-card>
    </v-dialog>
  </div>
</template>
