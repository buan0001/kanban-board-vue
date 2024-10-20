<script setup lang="ts">
import type { List } from "../types/List";
import { ref } from "vue";
import CreateCardDialog from "../components/CreateCardDialog.vue";
import { id } from "vuetify/locale";
// import TrelloList from './TrelloList.vue';

//   id: number
//   title: string
//   text: string
//   list: string
//   placement: number

const nextCardId = ref(0);

const board = ref([
  {
    id: 0,
    heading: "To do",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Brush my teeth",
        text: "It needs to be two minutes at least",
        listId: 1,
        placement: 1,
      },
      {
        id: nextCardId.value++,
        title: "Walk the dog",
        text: "A nice long walk in the sunday sun",
        listId: 1,
        placement: 2,
      },
      {
        id: nextCardId.value++,
        title: "Shave after shower",
        text: "Would be nice before school starts again",
        listId: 1,
        placement: 3,
      },
    ],
  },
  {
    id: 1,
    heading: "Doing",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Sleep well",
        text: "Good rest is important",
        listId: 1,
        placement: 1,
      },
    ],
  },
  {
    id: 2,
    heading: "Done",
    tasks: [
      {
        id: nextCardId.value++,
        // id: 5,
        title: "Have breakfast",
        text: "Energy is needed to withstand the toll of living",
        listId: 2,
        placement: 1,
      },
      {
        id: nextCardId.value++,
        // id: 6,
        title: "Breathe",
        text: "Everything needs air, so get some",
        listId: 2,
        placement: 2,
      },
    ],
  },
] as List[]);

function addCardToList(listId: number, card: { title: String; text: String }) {
  console.log(listId);
  const correctList = board.value[listId];
  console.log("Correct list:",correctList);
  const submitCard = {... card, placement: correctList.tasks.length+1, listId, id:nextCardId.value++}
  console.log("Submitable card:",submitCard);
  
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="list in board" :key="list.id">
        <v-card class="bg-orange-lighten-3">
          <!-- <v-card color="orange"> -->
          <v-card-title class="text-h4">{{ list.heading }}</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col v-for="card in list.tasks" :key="card.id" cols="12">
                  <v-card class="mb-1 bg-blue-grey-darken-1">
                    <v-card-title>{{ card.title }}</v-card-title>
                    <v-card-text>{{ card.text }}</v-card-text>
                    <v-card-subtitle>Id: {{ card.id }}</v-card-subtitle>
                    <v-card-subtitle>listId: {{ card.listId }}</v-card-subtitle>
                    <v-card-subtitle
                      >placement: {{ card.placement }}</v-card-subtitle
                    >
                  </v-card>
                </v-col>
                <CreateCardDialog :listId="list.id" :submit="addCardToList"></CreateCardDialog>
                <!-- <v-btn  color="secondary" rounded @click="buttonWasPressed(list.id)">Add another card</v-btn> -->
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- <template>
    <div v-for="list in board" :key="list.id">
        <div v-for="card in list.tasks" :key="card.id"> 
            <div> Id: {{ card.id }}</div>
            <div>listId: {{ card.listId }}</div>
            <div> placement: {{ card.placement }}</div>
            <div> title: {{ card.title }}</div>
            <div>text: {{ card.text }}</div>
        </div>
    </div>


    
</template> -->
