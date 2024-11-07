<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/04 22:51:48
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <div class="flex items-center">
    <label v-if="label || label === 0" class="flex-shrink-0" :style="{ width: `${labelWidth}px` }">
      {{ label }}
    </label>
    <div :style="{ width: `${contentWidth}px` }" class="flex-shrink-0">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  labelWidth: {
    type: Number,
    default: 80,
  },
  contentWidth: {
    type: Number,
    default: 220,
  },
})
</script>
