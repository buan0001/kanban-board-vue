<script setup lang="ts">
import type { List } from "../types/List";
import { ref } from "vue";
import TrelloList from "@/components/TrelloList.vue";

const nextCardId = ref(1);
const nextListId = ref(1)

// const board = ref({
//   headers: [
//     {
//       id: 0,
//       heading: "To do",
//     },
//     {
//       id: 1,
//       heading: "Doing",
//     },
//     {
//       id: 2,
//       heading: "Done",
//     },
//   ],
//   tasks: [
//     {
//       id: nextCardId.value++,
//       title: "Brush my teeth",
//       body: "It needs to be two minutes at least",
//       listId: 1,
//       placement: 1,
//     },
//     {
//       id: nextCardId.value++,
//       title: "Walk the dog",
//       body: "A nice long walk in the sunday sun",
//       listId: 1,
//       placement: 2,
//     },
//     {
//       id: nextCardId.value++,
//       title: "Shave after shower",
//       body: "Would be nice before school starts again",
//       listId: 1,
//       placement: 3,
//     },
//     {
//       id: nextCardId.value++,
//       // id: 5,
//       title: "Have breakfast",
//       body: "Energy is needed to withstand the toll of living",
//       listId: 2,
//       placement: 1,
//     },
//     {
//       id: nextCardId.value++,
//       // id: 6,
//       title: "Breathe",
//       body: "Everything needs air, so get some",
//       listId: 2,
//       placement: 2,
//     },
//     {
//       id: nextCardId.value++,
//       title: "Sleep well",
//       body: "Good rest is important",
//       listId: 1,
//       placement: 1,
//     },
//   ],
// });
// interface Board {
//   id: number,
//   heading: string,
//   tasks: List[]
// }
const board = ref([
  {
    id: nextListId.value++,
    heading: "To do",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Brush my teeth",
        body: "It needs to be two minutes at least",
      },
      {
        id: nextCardId.value++,
        title: "Walk the dog",
        body: "A nice long walk in the sunday sun",
      },
      {
        id: nextCardId.value++,
        title: "Shave after shower",
        body: "Would be nice before school starts again",
      },
    ],
  },
  {
    id: nextListId.value++,
    heading: "Doing",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Sleep well",
        body: "Good rest is important",
      },
    ],
  },
  {
    id: nextListId.value++,
    heading: "Done",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Have breakfast",
        body: "Energy is needed to withstand the toll of living",
      },
      {
        id: nextCardId.value++,
        title: "Breathe",
        body: "Everything needs air, so get some",
      },
    ],
  },
]
  )
// let board = ref([{id:0, heading:'', tasks:[{id:0, title:'', body:''}]}])
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

    console.log("Next card id value:",nextCardId.value);
    console.log("Next list value:",nextListId.value);
    console.log("Retrived:",board);
  }
  
}

// const board = ref([
//   {
//     id: 0,
//     heading: "To do",
//     tasks: [
//       {
//         id: nextCardId.value++,
//         title: "Brush my teeth",
//         body: "It needs to be two minutes at least",
//         listId: 1,
//         placement: 1,
//       },
//       {
//         id: nextCardId.value++,
//         title: "Walk the dog",
//         body: "A nice long walk in the sunday sun",
//         listId: 1,
//         placement: 2,
//       },
//       {
//         id: nextCardId.value++,
//         title: "Shave after shower",
//         body: "Would be nice before school starts again",
//         listId: 1,
//         placement: 3,
//       },
//     ],
//   },
//   {
//     id: 1,
//     heading: "Doing",
//     tasks: [
//       {
//         id: nextCardId.value++,
//         title: "Sleep well",
//         body: "Good rest is important",
//         listId: 1,
//         placement: 1,
//       },
//     ],
//   },
//   {
//     id: 2,
//     heading: "Done",
//     tasks: [
//       {
//         id: nextCardId.value++,
//         // id: 5,
//         title: "Have breakfast",
//         body: "Energy is needed to withstand the toll of living",
//         listId: 2,
//         placement: 1,
//       },
//       {
//         id: nextCardId.value++,
//         // id: 6,
//         title: "Breathe",
//         body: "Everything needs air, so get some",
//         listId: 2,
//         placement: 2,
//       },
//     ],
//   },
// ] as List[]);



function handleNewList() {
  console.log("adding new list");
  board.value.push({id: nextListId.value++, heading:'', tasks:[]})
  saveListToStorage()
}

// let lastUpdate = Date.now();
function saveListToStorage(){
  console.log("Lists changed!");
  // console.log("Last update:",lastUpdate.toString());
  // const now = Date.now()
  // if (lastUpdate > now)
  localStorage.setItem('board', JSON.stringify( board.value))
  
 
}

function handleDeleteList(id: number){
  console.log("Deleting list with id",id);
  
}


</script>

<template>
  <v-container fluid>
    <v-row class="no-wrap" style="overflow-x: auto; white-space: nowrap;">
      <v-col v-for="list in board" :key="list.id" class="d-inline-block" style="width: 300px;">
        <TrelloList :list="list" @update:list="saveListToStorage" @delete:list="handleDeleteList"/> 
      </v-col>
      <v-col class="d-inline-block" style="width: 300px;">
        <v-btn @click="handleNewList">Add new list</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- 
<template>
  <v-container fluid class="bg-red-lighten-2 h-100 m-a">
    <v-row class="no-wrap" style="overflow-x: auto; white-space: nowrap;">
      <v-col v-for="(list, index) in board" :key="list.id">
        <TrelloList v-model:list="board[index]" v-model:nextCardId="nextCardId"></TrelloList>
      </v-col>
    
    <v-btn @click="handleNewList">Add new list</v-btn>
    </v-row>
  </v-container>
</template> -->

<style scoped>
.no-wrap {
  display: flex;
  flex-wrap: nowrap;
}
</style>

