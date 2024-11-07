/**********************************
 * @FilePath: common.js
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/04 22:45:46
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import dayjs from 'dayjs'

/**
 * @param {(object | string | number)} time
 * @param {string} format
 * @returns {string | null} 格式化后的时间字符串
 *
 */
export function formatDateTime(time = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function formatDate(date = undefined, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format)
}

/**
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}  节流函数
 *
 */
export function throttle(fn, wait) {
  let context, args
  let previous = 0

  return function (...argArr) {
    const now = +new Date()
    context = this
    args = argArr
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

/**
 * @param {Function} method
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*} 防抖函数
 */
export function debounce(method, wait, immediate) {
  let timeout
  return function (...args) {
    const context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(context, args)
      }
    }
    else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @param {number} time 毫秒数
 * @returns 睡一会儿，让子弹暂停一下
 */
export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * @param {HTMLElement} el
 * @param {Function} cb
 * @return {ResizeObserver}
 */
export function useResize(el, cb) {
  const observer = new ResizeObserver((entries) => {
    cb(entries[0].contentRect)
  })
  observer.observe(el)
  return observer
}
