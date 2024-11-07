/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:22:49
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

export function useModal() {
  const modalRef = ref(null)
  const okLoading = computed({
    get() {
      return modalRef.value?.okLoading
    },
    set(v) {
      modalRef.value.okLoading = v
    },
  })
  return [modalRef, okLoading]
}
