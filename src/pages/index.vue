<script setup lang="ts">
import type { List } from "../types/List";
import { ref } from "vue";
import CreateCardDialog from "../components/CreateCardDialog.vue";
import { Card } from "@/types/Card";
// import Draggable from "vuedraggable";
import draggable from "vuedraggable";
// import TrelloList from './TrelloList.vue';

//   id: number
//   title: string
//   text: string
//   list: string
//   placement: number

const nextCardId = ref(0);

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
//       text: "It needs to be two minutes at least",
//       listId: 1,
//       placement: 1,
//     },
//     {
//       id: nextCardId.value++,
//       title: "Walk the dog",
//       text: "A nice long walk in the sunday sun",
//       listId: 1,
//       placement: 2,
//     },
//     {
//       id: nextCardId.value++,
//       title: "Shave after shower",
//       text: "Would be nice before school starts again",
//       listId: 1,
//       placement: 3,
//     },
//     {
//       id: nextCardId.value++,
//       // id: 5,
//       title: "Have breakfast",
//       text: "Energy is needed to withstand the toll of living",
//       listId: 2,
//       placement: 1,
//     },
//     {
//       id: nextCardId.value++,
//       // id: 6,
//       title: "Breathe",
//       text: "Everything needs air, so get some",
//       listId: 2,
//       placement: 2,
//     },
//     {
//       id: nextCardId.value++,
//       title: "Sleep well",
//       text: "Good rest is important",
//       listId: 1,
//       placement: 1,
//     },
//   ],
// });

const board = ref([
  {
    id: 0,
    heading: "To do",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Brush my teeth",
        text: "It needs to be two minutes at least",
      },
      {
        id: nextCardId.value++,
        title: "Walk the dog",
        text: "A nice long walk in the sunday sun",
      },
      {
        id: nextCardId.value++,
        title: "Shave after shower",
        text: "Would be nice before school starts again",
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
      },
    ],
  },
  {
    id: 2,
    heading: "Done",
    tasks: [
      {
        id: nextCardId.value++,
        title: "Have breakfast",
        text: "Energy is needed to withstand the toll of living",
      },
      {
        id: nextCardId.value++,
        title: "Breathe",
        text: "Everything needs air, so get some",
      },
    ],
  },
] as List[]);
// const board = ref([
//   {
//     id: 0,
//     heading: "To do",
//     tasks: [
//       {
//         id: nextCardId.value++,
//         title: "Brush my teeth",
//         text: "It needs to be two minutes at least",
//         listId: 1,
//         placement: 1,
//       },
//       {
//         id: nextCardId.value++,
//         title: "Walk the dog",
//         text: "A nice long walk in the sunday sun",
//         listId: 1,
//         placement: 2,
//       },
//       {
//         id: nextCardId.value++,
//         title: "Shave after shower",
//         text: "Would be nice before school starts again",
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
//         text: "Good rest is important",
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
//         text: "Energy is needed to withstand the toll of living",
//         listId: 2,
//         placement: 1,
//       },
//       {
//         id: nextCardId.value++,
//         // id: 6,
//         title: "Breathe",
//         text: "Everything needs air, so get some",
//         listId: 2,
//         placement: 2,
//       },
//     ],
//   },
// ] as List[]);

function addCardToList(listId: number, card: { title: string; text: string }) {
  console.log(listId);
  const correctList = board.value[listId];
  console.log("Correct list:", correctList);
  const submitCard = {
    ...card,
    placement: correctList.tasks.length ? correctList.tasks.length + 1 : 1,
    listId,
    id: nextCardId.value++,
  };
  console.log("Submitable card:", submitCard);
  correctList.tasks.push(submitCard);
}

function test(event: Event) {
  console.log("drag event:", event);
  console.log("Tasks after dragging:", board.value);
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="list in board" :key="list.id">
        <div style="min-height: 5000px">
          <v-card class="bg-orange-lighten-3 mx-auto h-100">
            <v-card-title class="text-h4">{{ list.heading }}</v-card-title>
            <v-container class="border h-100">
              <draggable
                v-model="list.tasks"
                itemKey="id"
                @change="test"
                group="lists"
                class="min-height-200"
              >
                <template #item="{ element: card }">
                  <v-col :key="card.id" cols="12">
                    <v-card class="mb-1 bg-blue-grey-darken-1">
                      <v-card-title>{{ card.title }}</v-card-title>
                      <v-card-text>{{ card.text }}</v-card-text>
                    </v-card>
                  </v-col>
                </template>
                <template #empty>
                  <v-col cols="12">
                    <v-card class="mb-1 bg-grey-lighten-2">
                      <v-card-text class="text-center">
                        Drop items here
                      </v-card-text>
                    </v-card>
                  </v-col>
                </template>
              </draggable>

              <CreateCardDialog
                :listId="list.id"
                :submit="addCardToList"
              ></CreateCardDialog>
            </v-container>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.min-height-200 {
  min-height: 500px;
}
</style>
