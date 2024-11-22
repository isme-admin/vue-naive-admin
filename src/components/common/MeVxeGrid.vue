<template>
  <div
    :style="isComputedHeight ? `height: calc(100% - ${autoHeight}px);` : `height: ${autoHeight}px`"
  >
    <vxe-grid
      ref="gridRef"
      :columns="vxeColumns"
      :loading="loading"
      :data="data"
      height="auto"
      :stripe="true"
      :border="true"
      size="mini"
      :auto-resize="true"
      :pager-config="pagerConfig"
      :export-config="exportConfig"
      :toolbar-config="vxeToolbarConfig"
      :proxy-config="proxyConfig"
      v-on="gridEvent"
    >
      <template #loading>
        <n-spin :show="loading" />
      </template>
      <template v-for="(c, k) in slots" :key="k" #[c.key]="{ row }">
        <template v-if="Array.isArray(c.render(row))">
          <component :is="r" v-for="(r, k1) in c.render(row)" :key="k1" :row="row" :col="c" />
        </template>
        <template v-else>
          <component :is="c.render(row)" :row="row" :col="c" />
        </template>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'MeVxeGrid' })
const props = defineProps({
  /**
   * @remote 当isComputedHeight为true时为除table外的高度 false时为table高度
   */
  autoHeight: {
    type: Number,
    default: 300,
  },
  /**
   * @isPagination 是否为自动计算高度
   */
  isComputedHeight: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @remote table的列
   */
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },

  pagination: {
    type: [Boolean, Object],
    default: true,
  },

  exportConfig: {
    type: Object,
    default: () => ({}),
  },
  toolbarConfig: {
    type: Object,
    default: () => ({ }),
  },
  /**
   * 是否显示复选框
   */
  showCheck: {
    type: Boolean,
    default: false,
  },
  rowKey: {
    type: String, // rowKey
    default: 'id',
  },

  exportMethod: {
    type: Function,
    default: () => null,
  },
  remoteMethod: {
    type: Function,
    default: () => null,
  },
})
const emits = defineEmits(['update:checked-row-keys', 'pageChanged'])
const isFirst = shallowRef(true)
const gridRef = ref(null)

watch(
  () => props.data,
  (n) => {
    isFirst.value = false
    gridRef.value.reloadData(n)
  },
)

const vxeToolbarConfig = computed(() => {
  return {
    size: 'mini',
    className: 'c-toolbar',
    perfect: true,
    refresh: true,
    export: true,
    zoom: true,
    custom: true,
    ...props.toolbarConfig,
  }
})
const pagerConfig = computed(() => {
  if (props.pagination === false) {
    return {
      enabled: false,
    }
  }
  return {
    currentPage: props.pagination.pageNo,
    pageSize: props.pagination.pageSize,
    total: props.pagination.itemCount,
    background: true,
    size: 'small',
    layouts: [
      'Home',
      'PrevPage',
      'JumpNumber',
      'NextPage',
      'End',
      'Sizes',
      'FullJump',
      'Total',
    ],
  }
})
/**
 * 将naive 转为vxe-table可用的列
 */
const vxeColumns = computed(() => {
  if (props.showCheck) {
    return [{
      type: 'checkbox',
      resizable: false,
      width: 45,
      align: 'center',
      fixed: 'left',
    }, ...props.columns.map((item) => {
      item.field = item.key
      if (item.render) {
        item.slots = { default: item.key }
      }
      return item
    })]
  }
  return props.columns.map((item) => {
    item.field = item.key
    if (item.render) {
      item.slots = { default: item.key }
    }
    return item
  })
})

/**
 * 将naive render函数转换为vxeTable的slots
 */
const slots = computed(() => {
  return props.columns.filter(item => item.render)
})

const gridEvent = {
  checkboxAll() {
    const $grid = gridRef.value
    if ($grid) {
      emits(
        'update:checked-row-keys',
        $grid.getCheckboxRecords().map(item => item[props.rowKey]),
      )
    }
  },
  checkboxChange() {
    const $grid = gridRef.value
    if ($grid) {
      emits(
        'update:checked-row-keys',
        $grid.getCheckboxRecords().map(item => item[props.rowKey]),
      )
    }
  },
  pageChange(e) {
    emits('pageChanged', e)
  },
}

const proxyConfig = {
  props: {
    result: 'data.pageData',
    total: 'data.total',
  },
  ajax: {
    query: async ({ page }) => {
      if (isFirst.value === true) {
        return Promise.reject('')
      }
      props.remoteMethod(page.currentPage, page.pageSize)
    },
    queryAll: async () => {
      const res = await props.exportMethod()
      return res
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
