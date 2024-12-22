/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2024/01/06 17:18:40
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router', () => {
  const router = useRouter()
  const route = useRoute()

  function resetRouter(accessRoutes) {
    accessRoutes.forEach((item) => {
      router.hasRoute(item.name) && router.removeRoute(item.name)
    })

    router.removeRoute('catchAll')
  }

  return {
    router,
    route,
    resetRouter,
  }
})
