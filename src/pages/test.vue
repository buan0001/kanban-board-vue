<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable";
import EmitTest from "@/components/EmitTest.vue"

const animeList = ref([
  {animes: [{ title: "Naruto" }, { title: "Arcane" }]},
  {animes: [{ title: "Death note book thing" }],}
]);

function emitCatcher(value:any) {
  console.log("Something was emitted! Value:", value);
  
}

</script>

<template>

  <EmitTest @test="emitCatcher"></EmitTest> 
   <!-- <div v-for="list in animeList">
    <draggable v-model="list.animes" tag="ol" group="stuff">
      <template #item="{ element: anime }">
        <li>{{ anime.title }}</li>
      </template>
    </draggable>
  </div> -->
</template>

<style>
li {
  cursor: pointer;
  padding: 12px;
  border: gray 1px solid;
  margin: 8px;
}

ol{
    border: red 1px solid;
}
</style>
