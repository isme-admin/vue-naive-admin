<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/04 22:51:42
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <div :class="computedHeight === true ? 'h-100%' : ''">
    <div id="search_main">
      <AppCard v-if="$slots.default" bordered bg="#fafafc dark:black" class="mb-30 min-h-60 rounded-4">
        <form class="flex justify-between p-16" @submit.prevent="handleSearch()">
          <n-scrollbar x-scrollable>
            <n-space :wrap="!expand || isExpanded" :size="[32, 16]" class="p-10">
              <slot />
            </n-space>
          </n-scrollbar>
          <div class="flex-shrink-0 p-10">
            <n-button ghost type="primary" @click="handleReset">
              <i class="i-fe:rotate-ccw mr-4" />
              重置
            </n-button>
            <n-button attr-type="submit" class="ml-20" type="primary">
              <i class="i-fe:search mr-4" />
              搜索
            </n-button>

            <template v-if="expand">
              <n-button v-if="!isExpanded" type="primary" text @click="toggleExpand">
                <i class="i-fe:chevrons-down ml-4" />
                展开
              </n-button>
              <n-button v-else text type="primary" @click="toggleExpand">
                <i class="i-fe:chevrons-up ml-4" />
                收起
              </n-button>
            </template>
          </div>
        </form>
      </AppCard>
    </div>
    <MeVxeGrid
      :remote="remote"
      :loading="loading"
      :scroll-x="scrollX"
      :columns="columns"
      :export-config="{ filename: exportName, modes: ['all', 'current'] }"
      :toolbar-config="toolbarConfig"
      :data="tableData"
      :auto-height="computedHeight === true ? autoHeight : computedHeight"
      :row-key="rowKey"
      :is-computed-height="computedHeight === true"
      :show-check="showCheck"
      :pagination="isPagination ? pagination : false"
      :remote-method="remoteMethod"
      :export-method="exportMethod"
      @update:checked-row-keys="onChecked"
      @update:page="onPageChange"
    />

  <!-- <NDataTable
    :remote="remote"
    :loading="loading"
    :scroll-x="scrollX"
    :columns="columns"
    :data="tableData"
    :row-key="(row) => row[rowKey]"
    :pagination="isPagination ? pagination : false"
    @update:checked-row-keys="onChecked"
    @update:page="onPageChange"
  /> -->
  </div>
</template>

<script setup>
import { utils, writeFile } from 'xlsx'

const props = defineProps({
  /**
   * 是否自动计算高度，适用只有search和table
   */
  computedHeight: {
    type: [Boolean, Number],
    default: () => true,
  },
  showCheck: {
    type: Boolean,
    default: () => false,
  },
  toolbarConfig: {
    type: Object,
    default: () => ({
      export: true,
      zoom: true,
    }),
  },
  /**
   * @remote 导出数据表格名称
   */
  exportName: {
    type: String,
    default: '导出数据',
  },
  /**
   * @remote true: 后端分页  false： 前端分页
   */
  remote: {
    type: Boolean,
    default: true,
  },
  /**
   * @isPagination 是否分页
   */
  isPagination: {
    type: Boolean,
    default: true,
  },
  scrollX: {
    type: Number,
    default: 1200,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  columns: {
    type: Array,
    required: true,
  },
  /** queryBar中的参数 */
  queryItems: {
    type: Object,
    default() {
      return {}
    },
  },
  /**
   * ! 约定接口入参出参
   * 分页模式需约定分页接口入参
   *    @pageSize 分页参数：一页展示多少条，默认10
   *    @pageNo   分页参数：页码，默认1
   * 需约定接口出参
   *    @pageData 分页模式必须,非分页模式如果没有pageData则取上一层data
   *    @total    分页模式必须，非分页模式如果没有total则取上一层data.length
   */
  getData: {
    type: Function,
    required: true,
  },
  /** 是否支持展开 */
  expand: Boolean,
})
const emit = defineEmits(['update:queryItems', 'onChecked', 'onDataChange'])

const autoHeight = ref(0)

window.onresize = () => {
  autoHeight.value = document.getElementById('search_main').clientHeight + 24
}

onMounted(() => {
  autoHeight.value = document.getElementById('search_main').clientHeight + 24
})

const loading = ref(false)
const initQuery = { ...props.queryItems }
const tableData = ref([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  prefix({ itemCount }) {
    return `共 ${itemCount} 条数据`
  },
})

// 是否展开
const isExpanded = ref(false)

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

async function exportMethod() {
  const { data } = await props.getData({
    pageNo: 1,
    pageSize: 2000,
    ...props.queryItems,
  })
  return data
}

function remoteMethod(page, pageSize) {
  pagination.page = page
  pagination.pageSize = pageSize

  handleQuery()
}

async function handleQuery() {
  try {
    loading.value = true
    let paginationParams = {}
    // 如果非分页模式或者使用前端分页,则无需传分页参数
    if (props.isPagination && props.remote) {
      paginationParams = { pageNo: pagination.page, pageSize: pagination.pageSize }
    }
    const { data } = await props.getData({
      ...props.queryItems,
      ...paginationParams,
    })
    tableData.value = data?.pageData || data
    pagination.itemCount = data.total ?? data.length
    if (pagination.itemCount && !tableData.value.length && pagination.page > 1) {
      // 如果当前页数据为空，且总条数不为0，则返回上一页数据
      onPageChange(pagination.page - 1)
    }
    return data
  }
  catch (error) {
    console.error(error)
    tableData.value = []
    pagination.itemCount = 0
  }
  finally {
    emit('onDataChange', tableData.value)
    loading.value = false
  }
}

function handleSearch(keepCurrentPage = false) {
  if (keepCurrentPage || !props.remote) {
    handleQuery()
  }
  else {
    onPageChange(1)
  }
}
async function handleReset() {
  const queryItems = { ...props.queryItems }
  for (const key in queryItems) {
    queryItems[key] = null
  }
  emit('update:queryItems', { ...queryItems, ...initQuery })
  await nextTick()
  pagination.page = 1
  handleQuery()
}
function onPageChange(currentPage) {
  pagination.page = currentPage
  if (props.remote) {
    handleQuery()
  }
}
function onChecked(rowKeys) {
  emit('onChecked', rowKeys)
}
function handleExport(columns = props.columns, data = tableData.value) {
  if (!data?.length)
    return $message.warning('没有数据')
  const columnsData = columns.filter(item => !!item.title && !item.hideInExcel)
  const thKeys = columnsData.map(item => item.key)
  const thData = columnsData.map(item => item.title)
  const trData = data.map(item => thKeys.map(key => item[key]))
  const sheet = utils.aoa_to_sheet([thData, ...trData])
  const workBook = utils.book_new()
  utils.book_append_sheet(workBook, sheet, '数据报表')
  writeFile(workBook, '数据报表.xlsx')
}

defineExpose({
  handleSearch,
  handleReset,
  handleExport,
})
</script>
