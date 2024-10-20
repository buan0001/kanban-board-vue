<script setup lang="ts">
import { ref } from 'vue';
import TrelloCard from './TrelloCard.vue';
import type { Card } from '@/types/Card';

const cardsInList = ref<Card[]>([])

</script>

<template>
    <TrelloCard v-for="card in cardsInList" :key="card.id"/>
</template>