<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Card } from "@/types/Card";

const emit = defineEmits<{
  submit: [Card]
}>()

const title = ref("");
const body = ref("");

const isDialogOpen = defineModel("isOpen", { default: false });
const props = defineProps<{ cardToUpdate: Card }>();
const isUpdate = computed(() => (props.cardToUpdate.id ? true : false));

watch(
  props,
  (newCard) => {
    if (newCard) {
      title.value = newCard.cardToUpdate.title;
      body.value = newCard.cardToUpdate.body;
    }
  },
  { immediate: true }
);

function submitCard() {
  emit("submit", {
    title: title.value,
    body: body.value,
    id: props.cardToUpdate.id,
  });

  clear();
}

function clear() {
  isDialogOpen.value = false;
}

</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="isDialogOpen" width="auto">
      <v-card>
        <v-card-title> {{ isUpdate ? "Update" : "Create" }} card</v-card-title>
        <div class="ma-5">
          <v-text-field label="Name of the task" v-model="title"></v-text-field>
          <v-textarea label="Details" v-model="body"></v-textarea>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <!-- <template v-slot:actions> -->
          <v-btn variant="outlined" text="Close" @click="clear"></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            color="primary"
            text="Confirm"
            @click="submitCard"
          ></v-btn>
        </v-card-actions>
        <!-- </template> -->
      </v-card>
    </v-dialog>
  </div>
</template>
