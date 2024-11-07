<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:28:02
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <CommonPage>
    <n-upload
      class="mx-auto w-[75%] p-20 text-center"
      :custom-request="handleUpload"
      :show-file-list="false"
      accept=".png,.jpg,.jpeg"
      @before-upload="onBeforeUpload"
    >
      <n-upload-dragger>
        <div class="h-150 f-c-c flex-col">
          <i class="i-mdi:upload mb-12 text-68 color-primary" />
          <n-text class="text-14 color-gray">
            点击或者拖动文件到该区域来上传
          </n-text>
        </div>
      </n-upload-dragger>
    </n-upload>

    <n-card v-if="imgList && imgList.length" class="mt-16 items-center">
      <n-image-group>
        <n-space justify="space-between" align="center">
          <n-card v-for="(item, index) in imgList" :key="index" class="w-280 hover:card-shadow">
            <div class="h-160 f-c-c">
              <n-image width="200" :src="item.url" />
            </div>
            <n-space class="mt-16" justify="space-evenly">
              <n-button dashed type="primary" @click="copy(item.url)">
                url
              </n-button>
              <n-button dashed type="primary" @click="copy(`![${item.fileName}](${item.url})`)">
                MD
              </n-button>
              <n-button
                dashed
                type="primary"
                @click="copy(`&lt;img src=&quot;${item.url}&quot; /&gt;`)"
              >
                img
              </n-button>
              <n-button
                dashed
                type="primary"
                @click="deleteFile(item.fileId)"
              >
                删除
              </n-button>
            </n-space>
          </n-card>
          <div v-for="i in 4" :key="i" class="w-280" />
        </n-space>
      </n-image-group>
    </n-card>
  </CommonPage>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import api from './api'

defineOptions({ name: 'ImgUpload' })

const { copy, copied } = useClipboard()

const imgList = ref([])
api.fileList().then(({ data = [] }) => (imgList.value = data))

watch(copied, (val) => {
  if (val)
    $message.success('已复制到剪切板')
})

function onBeforeUpload({ file }) {
  if (!file.file?.type.startsWith('image/')) {
    $message.error('只能上传图片')
    return false
  }
  if (file.file.size > 1024 * 1024) {
    $message.error('文件应小于1M')
    return false
  }
  return true
}

async function handleUpload({ file, onFinish }) {
  if (!file || !file.type) {
    $message.error('请选择文件')
  }

  // formData
  const formData = new FormData();
  formData.append("file", file.file)
  formData.append("category", "personal")
  formData.append("fileName", file.name)
  // 上传
  $message.loading('上传中...', { key: 'upload' })
  try {
    const { data } = await api.upload(formData)
    setTimeout(() => {
      $message.success('上传成功', { key: 'upload' })
      imgList.value.push({
        fileName: file.name,
        url: URL.createObjectURL(file.file),
        fileId: data[0].fileId
      })
      $message.destroy('upload')
      onFinish()
    }, 1000)
  } catch (e) {
    console.log("文件上传失败", e)
    $message.destroy('upload')
  }
}

async function deleteFile(fileId) {
  console.log(imgList.value)
  console.log(fileId)
  const { data } = await api.deleteFile(fileId)
  imgList.value = imgList.value.filter(f => f.fileId !== fileId)
  $message.success('删除成功', { key: 'delete' })
}
</script>
