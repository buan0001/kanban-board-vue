<script setup lang="ts">
import { ref } from "vue";
import TrelloList from "@/components/TrelloList.vue";

const nextCardId = ref(1);
const nextListId = ref(1)

const board = ref([
  {
    id: nextListId.value++,
    heading: "To do",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Do important business thing",
        body: "A lot of important details here",
      },
      {
        id: nextCardId.value++,
        title: "Walk the dog",
        body: "Very important, please keep doing this task once started",
      },
      {
        id: nextCardId.value++,
        title: "Make JavaScript framework",
        body: "The world is waiting for a new JS framework",
      },
    ],
  },
  {
    id: nextListId.value++,
    heading: "Doing",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Breathe",
        body: "This task MUST NOT leave 'doing'",
      },
    ],
  },
  {
    id: nextListId.value++,
    heading: "Done",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Make trello board",
        body: "Please dont spend too much time, not needed",
      },
      {
        id: nextCardId.value++,
        title: "Respond to emails",
        body: "The title says it all, really",
      },
    ],
  },
]
  )

// Check for local storage on initial load
loadFromStorage()

function loadFromStorage(){
  let stored = localStorage.getItem('board')
  if (stored){
    board.value = JSON.parse(stored)
    // Set the id-generators values appropriately
    nextListId.value = board.value.length
    nextCardId.value = 1;
    for (const list of board.value) {  
      nextCardId.value += list.tasks.length
    }
  }
}

function handleNewList() {
  board.value.push({id: nextListId.value++, heading:'', tasks:[]})
  saveListToStorage()
}

function saveListToStorage(){
  localStorage.setItem('board', JSON.stringify( board.value))
}

function handleDeleteList(deleteId: number){
  board.value = board.value.filter(list => list.id != deleteId)
  saveListToStorage()
}

</script>

<template>
  <v-container fluid>
    <v-row class="no-wrap" style="overflow-x: auto; white-space: nowrap;">
      <v-col v-for="list in board" :key="list.id" class="d-inline-block" style="width: 300px;">
        <TrelloList :list="list" @update:list="saveListToStorage" @delete:list="handleDeleteList" v-model:nextCardId="nextCardId"/> 
      </v-col>
      <v-col class="d-inline-block" style="width: 300px;">
        <v-btn @click="handleNewList">Add new list</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.no-wrap {
  display: flex;
  flex-wrap: nowrap;
}
</style>

