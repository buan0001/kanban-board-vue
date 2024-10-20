<script setup lang="ts">
import { ref} from "vue";
import type { Card } from "@/types/Card";

const { card } = defineProps<{ card: Card }>();
const isIconHovered = ref(false);
const openDialog = defineModel("openDialog");
const currentCard = defineModel("currentCard");

function editClicked() {
  openDialog.value = true;
  console.log("Card:",card);
  
  currentCard.value = { ...card };
}
</script>

<template>
  <v-col :key="card.id" cols="12">
    <v-card
      style="cursor: pointer"
      :class="
        isIconHovered ? 'mb-1 bg-red-lighten-3' : 'mb-1 bg-blue-grey-darken-1'
      "
    >
      <v-card-title>
        {{ card.title }}
        <v-icon
          size="tiny"
          @mouseenter="isIconHovered = true"
          @mouseleave="isIconHovered = false"
          @click="editClicked"
        >
          mdi-pencil
        </v-icon>
      </v-card-title>
      <v-card-text>{{ card.body }}</v-card-text>
    </v-card>
  </v-col>
</template>

<style scoped>
.on-hover {
  background-color: #ffeb3b; /* Highlight color */
}
</style>
