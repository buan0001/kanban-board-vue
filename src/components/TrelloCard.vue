<script setup lang="ts">

import { ref } from 'vue'
// import type { Card } from '@/types/Card';

const props = defineProps({
  aNumber: Number,
  name: String,
  nameChanged: Function,
})

const modelName = defineModel('name')
const modelNumber = defineModel('number')

</script>

<!-- <template>
  <CompTS :aNumber="someNumber" v-model:name="someName" v-model:number="someNumber"/>
</template> -->



<template>
  <div>Age: {{ props.aNumber }}</div>
  <div>Dog's name: {{ modelName }}</div>
  <!-- <div>{{ props.name }}</div> -->
   <v-responsive>
    <v-text-field label="Name of your woof woof?" v-model="modelName" />
    <v-text-field label="How old is your dog?" clearable v-model="modelNumber" />
    </v-responsive>
</template>
