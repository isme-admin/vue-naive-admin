<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <i
        class="i-fe:beginner mr-16 cursor-pointer text-20"
        @click="show = true"
      />
    </template>
    新手教程
  </n-tooltip>

  <Vue3IntroStep
    v-model:show="show"
    :config="config"
  />
</template>

<script setup>
import Vue3IntroStep from 'vue3-intro-step'

const show = shallowRef(false)

const config = {
  backgroundOpacity: 0.8,
  titleStyle: {
    textAlign: 'left',
    fontSize: '18px',
  },
  contentStyle: {
    textAlign: 'left',
    fontSize: '14px',
  },
  tips: [
    {
      el: '#toggleTheme',
      tipPosition: 'bottom',
      title: '切换系统主题',
      content: '一键开启护眼模式',
    },
    {
      el: '#fullscreen',
      tipPosition: 'bottom',
      title: '全屏/退出全屏',
      content: '一键开启全屏',
    },
    {
      el: '#theme-setting',
      tipPosition: 'bottom',
      title: '设置主题色',
      content: '调整为你喜欢的主题色',
    },
    {
      el: '#user-dropdown',
      tipPosition: 'bottom',
      title: '个人中心',
      content: '查看个人资料和退出系统',
    },
    {
      el: '#menu-collapse',
      tipPosition: 'bottom',
      title: '展开/收起菜单',
      content: '一键展开/收起菜单',
    },
    {
      el: '#top-tab',
      tipPosition: 'bottom',
      title: '标签栏',
      content: '鼠标滚轮滑动可调整至最佳视野',
    },
    {
      el: '#layout-setting',
      tipPosition: 'left',
      title: '调整系统布局',
      content: '将系统布局调整为你喜欢的样子',
    },
  ],
}
</script>
