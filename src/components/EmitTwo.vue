
<script setup lang="ts">
import {ref} from 'vue'
// const modeled = defineModel<{name: string, id: number}>('dog')
const newName = ref('')
// defineEmits(['new-name'])

defineEmits<{
  newName: [string] // named tuple syntax
}>()
</script>

<template>
    <v-text-field v-model="newName"></v-text-field>
    <v-btn @click="$emit('newName', newName)">Button two</v-btn>
</template>