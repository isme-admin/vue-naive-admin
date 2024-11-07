<template>
  <AppPage full>
    <iframe :src="route.meta.originPath" frameborder="0" class="wh-full" />
  </AppPage>
</template>

<script setup>
const route = useRoute()
</script>
