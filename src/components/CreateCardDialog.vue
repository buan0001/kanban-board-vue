<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  listId: Number,
  submit: Function
});

const dialog = ref(false);
const newPost = ref({title:"", body:""});


function addNewCard() {
  dialog.value = false;
  if (props.submit && props.listId){
    props.submit(props.listId, {title: newPost.value.title, text: newPost.value.body})
  }
}

</script>

<template>
  <div class="text-center pa-4">
    <v-btn @click="dialog = true"> Add task </v-btn>

    <v-dialog v-model="dialog" width="auto">
      <v-card title="Add a new task">
        <div class="ma-5">
          <v-text-field
            label="Name of the new task"
            v-model="newPost.title"
          ></v-text-field>

          <v-textarea label="Details" v-model="newPost.body"></v-textarea>

        </div>
        <v-divider></v-divider>
        <template v-slot:actions>
          <v-btn
            variant="outlined"
            text="Close"
            @click="dialog = false"
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
