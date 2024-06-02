/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:28:30
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'

export default {
  upload: (data) => request.postForm('/file/upload', data),
  download: (fileId) => request.get('/file/download/'+fileId, { noNeedToken: true }),
  fileList: (data) => request.get('/file/list', data),
  deleteFile: (fileId) => request.delete('/file/delete/'+fileId),
}
