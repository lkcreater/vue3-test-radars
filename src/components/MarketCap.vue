<template>
    <a-typography-text type="warning">
        {{ converBillion(props.value) }}
    </a-typography-text>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

const props = defineProps<{
    value: number
}>();

const converBillion = (price: number | null) => {
    return (price) ? ((price)/1000000000).toFixed(2) + ' B' : 'N/A'
}

</script>

<style scoped>

</style>