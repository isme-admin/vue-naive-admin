/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2024/01/13 17:41:26
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

// 获取元素的CSS样式
function getCss(element, key) {
  return element.currentStyle
    ? element.currentStyle[key]
    : window.getComputedStyle(element, null)[key]
}

// 初始化拖拽
export function initDrag(bar, box) {
  if (!bar || !box)
    return
  const params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false,
  }

  if (getCss(box, 'left') !== 'auto') {
    params.left = getCss(box, 'left')
  }
  if (getCss(box, 'top') !== 'auto') {
    params.top = getCss(box, 'top')
  }

  // 设置触发拖动元素的鼠标样式为移动图标
  bar.style.cursor = 'move'
  // 鼠标按下事件处理函数
  bar.onmousedown = function (e) {
    params.flag = true // 设置拖拽标志为true
    e.preventDefault() // 阻止默认事件
    params.currentX = e.clientX // 鼠标当前位置的X坐标
    params.currentY = e.clientY // 鼠标当前位置的Y坐标
  }
  document.onmouseup = function () {
    params.flag = false // 设置拖拽标志为false
    if (getCss(box, 'left') !== 'auto') {
      params.left = getCss(box, 'left')
    }
    if (getCss(box, 'top') !== 'auto') {
      params.top = getCss(box, 'top')
    }
  }
  document.onmousemove = function (e) {
    if (e.target !== bar && !params.flag)
      return

    e.preventDefault() // 阻止默认事件
    // 如果拖拽标志为true
    if (params.flag) {
      const nowX = e.clientX // 鼠标当前位置的X坐标
      const nowY = e.clientY // 鼠标当前位置的Y坐标
      const disX = nowX - params.currentX // 鼠标移动的X距离
      const disY = nowY - params.currentY // 鼠标移动的Y距离

      const left = Number.parseInt(params.left) + disX // 盒子元素的新left值
      const top = Number.parseInt(params.top) + disY // 盒子元素的新top值

      box.style.left = `${left}px`
      box.style.top = `${top}px`
    }
  }
}
