/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:23:01
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { router } from '@/router'

const permission = {
  mounted(el, binding) {
    const currentRoute = unref(router.currentRoute)
    const btns = currentRoute.meta?.btns?.map(item => item.code) || []
    if (!btns.includes(binding.value)) {
      el.remove()
    }
  },
}

export function setupDirectives(app) {
  app.directive('permission', permission)
}
