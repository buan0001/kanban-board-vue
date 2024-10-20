<script setup lang="ts">
import type { List } from "../types/List";
import { ref } from "vue";
import TrelloList from "@/components/TrelloList.vue";

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



function test(event: Event) {
  console.log("drag event:", event);
  console.log("Tasks after dragging:", board.value);
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="(list, index) in board" :key="list.id">
        <TrelloList v-model:list="board[index]" v-model:nextCardId="nextCardId"></TrelloList>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.min-height-200 {
  min-height: 500px;
}
</style>
