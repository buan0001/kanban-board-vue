
<script setup lang="ts">
import {ref} from 'vue'
const dummy = ref({name:"nanu", id:1})

function catcher(name: string){
    console.log("Caught:",name);
    
}

defineEmits(['test'])

// const emit = defineEmits<{
//   test: [string] // named tuple syntax
// }>()

</script>

<template>
    <EmitTwo @new-name="catcher"></EmitTwo>
    <div>Parent: {{ dummy.name }} {{ dummy.id }}</div>
    <v-btn @click="$emit('test', dummy.name)">Button one</v-btn>
</template>