<script setup lang="ts">
import { ref } from "vue";
import TrelloCard from "./TrelloCard.vue";
import type { Card } from "@/types/Card";
import { List } from "@/types/List";
import draggable from "vuedraggable";
import SubmitCardDialog from "./SubmitCardDialog.vue";

const list = defineModel<List>("list");
const nextCardId = defineModel<number>("nextCardId");
defineEmits(['update:list', 'delete:list'])

const isDisabled = ref(true);

function addCardToList(card: Card) {
  console.log("ADd card to list:",card);
  
  if (list.value) {
    if (card.id) {
      console.log("Card id:",card.id);
      
      const correctTask = list.value.tasks?.find((task) => task.id == card.id);
      console.log("Correct task:", correctTask);
      if (correctTask) {
        correctTask.body = card.body;
        correctTask.title = card.title;
      }
    } else if (nextCardId.value) {
      const submitCard = {
        ...card,
        id: (nextCardId.value += 1),
      };
      console.log("Submitable card:", submitCard);
      list.value.tasks?.push(submitCard);
    }
  }
}

const emptyCard ={ title: "", body: "", id:0}

function openDialog(){
  isDialogOpen.value = true;
  currentCard.value = emptyCard
  
}

const isDialogOpen = ref(false);
const isDeleteHovered = ref(false)
const isEditHovered = ref(false)
const currentCard = ref({...emptyCard});

function hoverTest(){
  console.log("Hovering icon");
  
}
</script>

<template>
  <v-card class="h-100 " v-if="list"
  :class=" isDeleteHovered ? 'bg-red-lighten-3' : isEditHovered ? 'bg-yellow-lighten-3': 'bg-blue-lighten-3' "
  >
    <v-card-title class="text-h4">
      <v-text-field
        v-model="list.heading"
        :readonly="isDisabled"       
        style="cursor: pointer"
        :hint="isDisabled? 'Toggle edit to the right' : ''"
        :variant="isDisabled ? 'underlined' : 'solo'"
      >
      <template #append-inner>
          <v-icon
            @mouseover="isEditHovered = true"
            @mouseleave="isEditHovered = false"
            @click="isDisabled = !isDisabled"
          >
            mdi-pencil
          </v-icon>
        </template>
      <template #append>
          <v-icon
            @mouseover="isDeleteHovered = true"
            @mouseleave="isDeleteHovered = false"
            @click="$emit('delete:list')"
          >
            mdi-delete
          </v-icon>
        </template>
      
      </v-text-field>
    </v-card-title>

    <v-container class="border h-100">
      <v-col>
        <draggable v-model="list.tasks" itemKey="id" group="lists" @change="$emit('update:list')">
          <template #item="{ element: card }">
            <TrelloCard
              :card
              v-model:openDialog="isDialogOpen"
              v-model:currentCard="currentCard"
            />
          </template>
        </draggable>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="openDialog"> Add task </v-btn>
      </v-col>

      <SubmitCardDialog
        @submit="addCardToList"
        :cardToUpdate="currentCard"
        v-model:isOpen="isDialogOpen"
      ></SubmitCardDialog>
    </v-container>
  </v-card>
</template>

