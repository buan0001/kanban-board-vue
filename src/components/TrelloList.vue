<script setup lang="ts">
import { ref } from "vue";
import TrelloCard from "./TrelloCard.vue";
import type { Card } from "@/types/Card";
import { List } from "@/types/List";
import draggable from "vuedraggable";
import SubmitCardDialog from "./SubmitCardDialog.vue";

const list = defineModel<List>("list");
const nextCardId = defineModel<number>("nextCardId");
const emit = defineEmits(["update:list", "delete:list"]);

const emptyCard = { title: "", body: "", id: 0 };

const isDisabled = ref(true);
const isDialogOpen = ref(false);
const isDeleteHovered = ref(false);
const isEditHovered = ref(false);
const currentCard = ref({ ...emptyCard });

function addCardToList(card: Card) {
  if (list.value) {
    if (card.id) {
      const correctTask = list.value.tasks?.find((task) => task.id == card.id);
      if (correctTask) {
        correctTask.body = card.body;
        correctTask.title = card.title;
      }
    } else if (nextCardId.value) {
      const submitCard = {
        ...card,
        id: (nextCardId.value += 1),
      };
      list.value.tasks?.push(submitCard);
      emit("update:list");
    }
  }
}



function openDialog() {
  isDialogOpen.value = true;
  currentCard.value = emptyCard;
}

function deleteCardClicked(deleteCard: Card) {
  if (list.value) {
    list.value.tasks = list.value?.tasks?.filter(
      (entry) => entry.id != deleteCard.id
    );
    emit("update:list");
  }
}

function editCardClicked(card: Card) {
  currentCard.value = { title: card.title, body: card.body, id: card.id };
}


</script>

<template>
  <v-card
    class="h-100"
    v-if="list"
    :class="
      isDeleteHovered
        ? 'bg-red-lighten-3'
        : isEditHovered
        ? 'bg-yellow-lighten-3'
        : 'bg-blue-lighten-3'
    "
  >
    <v-card-title class="text-h4">
      <v-text-field
        v-model="list.heading"
        @update:model-value="$emit('update:list')"
        :readonly="isDisabled"
        style="cursor: pointer"
        :hint="isDisabled ? 'Toggle edit to the right' : ''"
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
            @click="$emit('delete:list', list.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-text-field>
    </v-card-title>

    <v-container class="border h-100">
      <v-col>
        <draggable
          v-model="list.tasks"
          itemKey="id"
          group="lists"
          @change="$emit('update:list')"
        >
          <template #item="{ element: card }">
            <TrelloCard
              @deleteCard="deleteCardClicked"
              @editCard="editCardClicked"
              :card
              v-model:openDialog="isDialogOpen"
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
