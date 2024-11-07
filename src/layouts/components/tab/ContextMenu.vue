<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 18:50:48
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <n-dropdown
    :show="show"
    :options="options"
    :x="x"
    :y="y"
    placement="bottom-start"
    @clickoutside="handleHideDropdown"
    @select="handleSelect"
  />
</template>

<script setup>
import { useTabStore } from '@/store'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  currentPath: {
    type: String,
    default: '',
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:show'])

const tabStore = useTabStore()

const options = computed(() => [
  {
    label: '重新加载',
    key: 'reload',
    disabled: props.currentPath !== tabStore.activeTab,
    icon: () => h('i', { class: 'i-mdi:refresh text-14' }),
  },
  {
    label: '关闭',
    key: 'close',
    disabled: tabStore.tabs.length <= 1,
    icon: () => h('i', { class: 'i-mdi:close text-14' }),
  },
  {
    label: '关闭其他',
    key: 'close-other',
    disabled: tabStore.tabs.length <= 1,
    icon: () => h('i', { class: 'i-mdi:arrow-expand-horizontal text-14' }),
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    disabled: tabStore.tabs.length <= 1 || props.currentPath === tabStore.tabs[0].path,
    icon: () => h('i', { class: 'i-mdi:arrow-expand-left text-14' }),
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    disabled:
      tabStore.tabs.length <= 1
      || props.currentPath === tabStore.tabs[tabStore.tabs.length - 1].path,
    icon: () => h('i', { class: 'i-mdi:arrow-expand-right text-14' }),
  },
])

const route = useRoute()
const actionMap = new Map([
  [
    'reload',
    () => {
      tabStore.reloadTab(route.fullPath, route.meta?.keepAlive)
    },
  ],
  [
    'close',
    () => {
      tabStore.removeTab(props.currentPath)
    },
  ],
  [
    'close-other',
    () => {
      tabStore.removeOther(props.currentPath)
    },
  ],
  [
    'close-left',
    () => {
      tabStore.removeLeft(props.currentPath)
    },
  ],
  [
    'close-right',
    () => {
      tabStore.removeRight(props.currentPath)
    },
  ],
])

function handleHideDropdown() {
  emit('update:show', false)
}

function handleSelect(key) {
  const actionFn = actionMap.get(key)
  if (typeof actionFn === 'function')
    actionFn()
  handleHideDropdown()
}
</script>
