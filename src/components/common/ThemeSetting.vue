<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-color-picker
        id="theme-setting"
        class="mr-16 h-32 w-32"
        :value="appStore.primaryColor"
        :swatches="primaryColors"
        :on-update:value="(v) => appStore.setPrimaryColor(v)"
        :render-label="() => ''"
      />
    </template>
    设置主题色
  </n-tooltip>
</template>

<script setup>
import { useAppStore } from '@/store'
import { getPresetColors } from '@arco-design/color'

const appStore = useAppStore()

const primaryColors = Object.entries(getPresetColors()).map(([, value]) => value.primary)
</script>
