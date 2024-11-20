/**********************************
 * @Description: 入口文件
 * @FilePath: main.js
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/04 22:41:32
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import ExcelJS from 'exceljs'
import { createApp } from 'vue'
import App from './App.vue'

import { setupDirectives } from './directives'
/**
 * 引入vxe-table 和 vxe-pc-ui excel导出
 */
import VxeUI from 'vxe-pc-ui'
import VXETable from 'vxe-table'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import { setupRouter } from './router'
import { setupStore } from './store'

import { setupNaiveDiscreteApi } from './utils'
import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'
import '@/styles/reset.css'
import '@/styles/global.css'
import 'uno.css'

async function bootstrap() {
  const app = createApp(App)

  VXETable.use(VXETablePluginExportXLSX, {
    ExcelJS,
  })
  app.use(VxeUI).use(VXETable)

  setupStore(app)
  setupDirectives(app)
  await setupRouter(app)
  app.mount('#app')
  setupNaiveDiscreteApi()
}

bootstrap()
