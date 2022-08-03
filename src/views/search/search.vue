<template>
  <div class="search">
    <h2>{{ $route.query.endDate }}</h2>
    <h2>{{ $route.query.currentCity }}</h2>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<style lang="less" scoped>

</style>