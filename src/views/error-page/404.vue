<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:28:15
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <CommonPage :show-header="false">
    <div class="wh-full flex">
      <n-result
        m-auto
        status="404"
        title="404 您访问的页面不存在"
        description="生活总归带点荒谬"
        size="large"
      >
        <template #footer>
          <n-button type="primary" ghost @click="replace('/')">
            返回首页
          </n-button>
        </template>
      </n-result>
    </div>
  </CommonPage>
</template>

<script setup>
const { replace } = useRouter()
</script>
