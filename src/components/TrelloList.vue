<script setup lang="ts">
import { ref } from "vue";
import TrelloCard from "./TrelloCard.vue";
import type { Card } from "@/types/Card";
import { List } from "@/types/List";
import draggable from "vuedraggable";
import SubmitCardDialog from "./SubmitCardDialog.vue";

const list = defineModel<List>("list");
const nextCardId = defineModel<number>("nextCardId");

const isDisabled = ref(true);

function addCardToList(card: Card) {
  if (list.value) {
    if (card.id) {
      const correctTask = list.value.tasks?.find((task) => task.id == card.id);
      console.log("Correct task:", correctTask);
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

const isDialogOpen = ref(false);
const currentCard = ref({ title: "", body: "", id: 0 });
</script>

<template>
  <v-card class="mx-auto h-100" v-if="list">
    <v-card-title class="text-h4">
      <v-text-field
        v-model="list.heading"
        :readonly="isDisabled"
        appendIcon="mdi-pencil"
        style="cursor: pointer"
        @click:append="isDisabled = !isDisabled"
        hint="Toggle edit to the right"
        :variant="isDisabled ? 'underlined' : 'solo'"
      >
      </v-text-field>
    </v-card-title>

    <v-container class="border h-100">
      <draggable v-model="list.tasks" itemKey="id" group="lists">
        <template #item="{ element: card }">
          <TrelloCard
            :card
            v-model:openDialog="isDialogOpen"
            v-model:currentCard="currentCard"
          />
        </template>
      </draggable>
      <v-btn @click="isDialogOpen = true"> Add task </v-btn>

      <SubmitCardDialog
        :submit="addCardToList"
        :cardToUpdate="currentCard"
        v-model:isOpen="isDialogOpen"
      ></SubmitCardDialog>
    </v-container>
  </v-card>
</template>
