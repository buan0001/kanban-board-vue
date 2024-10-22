<script setup lang="ts">
import { ref } from "vue";
import type { Card } from "@/types/Card";

const { card } = defineProps<{ card: Card }>();
const isIconHovered = ref(false);
const isDeletedHovered = ref(false);
const openDialog = defineModel("openDialog");
// const currentCard = defineModel("currentCard");

const emit = defineEmits<{
  editCard: [value: Card];
  deleteCard: [value: Card];
}>();

function editClicked() {
  openDialog.value = true;
  emit("editCard", { title: card.title, body: card.body, id: card.id });
}

function deleteClicked() {
  emit("deleteCard", { title: card.title, body: card.body, id: card.id });
}
</script>

<template>
  <v-col :key="card.id" cols="12">
    <v-card
      style="cursor: pointer"
      :class="
        isIconHovered
          ? 'bg-yellow-lighten-3'
          : isDeletedHovered
          ? 'bg-red-lighten-3'
          : 'bg-blue-grey-darken-1'
      "
      :subtitle="card.title"
    >
      <template #prepend>
        <v-icon
          @mouseenter="isIconHovered = true"
          @mouseleave="isIconHovered = false"
          @click="editClicked"
        >
          mdi-pencil
        </v-icon>
      </template>
      <template #append>
        <v-icon
          @mouseenter="isDeletedHovered = true"
          @mouseleave="isDeletedHovered = false"
          @click="deleteClicked"
        >
          mdi-delete
        </v-icon>
      </template>

      <v-card-text class="text-small wrap-text">{{ card.body }}</v-card-text>
      <!-- <v-card-text class="text-small">{{ card.body }}</v-card-text> -->
    </v-card>
  </v-col>
</template>

<style scoped>
.on-hover {
  background-color: #ffeb3b; /* Highlight color */
}
.wrap-text {
  white-space: normal; /* Allow text to wrap */
  word-break: break-word; /* Break long words */
}
</style>
