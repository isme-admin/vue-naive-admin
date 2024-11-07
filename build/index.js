/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/04 22:48:02
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import path from 'node:path'
import { globSync } from 'glob'
import dynamicIcons from '../src/assets/icons/dynamic-icons.js'

/**
 * @usage 生成icons, 用于 unocss safelist，以支持页面动态渲染自定义图标
 */
export function getIcons() {
  const feFiles = globSync('src/assets/icons/feather/*.svg', { nodir: true, strict: true })
  const meFiles = globSync('src/assets/icons/isme/*.svg', { nodir: true, strict: true })
  const feIcons = feFiles.map((filePath) => {
    const fileName = path.basename(filePath) // 获取文件名，包括后缀
    const fileNameWithoutExt = path.parse(fileName).name // 获取去除后缀的文件名
    return `i-fe:${fileNameWithoutExt}`
  })
  const meIcons = meFiles.map((filePath) => {
    const fileName = path.basename(filePath) // 获取文件名，包括后缀
    const fileNameWithoutExt = path.parse(fileName).name // 获取去除后缀的文件名
    return `i-me:${fileNameWithoutExt}`
  })

  return [...dynamicIcons, ...feIcons, ...meIcons]
}

/**
 * @usage 生成.vue文件路径列表，用于添加菜单时可下拉选择对应的.vue文件路径，防止手动输入报错
 */
export function getPagePathes() {
  const files = globSync('src/views/**/*.vue')
  return files.map(item => `/${path.normalize(item).replace(/\\/g, '/')}`)
}
