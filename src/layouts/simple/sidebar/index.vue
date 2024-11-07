<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:24:09
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <SideLogo border-b="1px solid light_border dark:dark_border" />
  <SideMenu class="cus-scroll-y mt-4 h-0 flex-1" />
  <div class="my-12 flex items-center justify-around px-12">
    <UserAvatar v-if="!appStore.collapsed" />
    <MenuCollapse />
  </div>
</template>

<script setup>
import { MenuCollapse, SideLogo, SideMenu, UserAvatar } from '@/layouts/components'
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>
