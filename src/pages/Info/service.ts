/**
 *
 */
import request from "umi-request";

/**
 * 获取用户信息
 */
export async function getUserInfo() {
  return request('/api/user/getInfo/v1')
}

/**
 * 更新用户基本信息
 */
export async function updateBaseInfo(values: any) {
  return request('/api/user/updateBaseInfo/v1',{
    method:'POST',
    data:values
  })
}

/**
 * 更新用户账号
 */
export async function updateAccount(value:any) {
  return request('/api/user/updateAccount/v1',{
    method:'POST',
    data:value
  })
}

/**
 * 更新密码
 */
export async function updatePassword(value:any) {
  return request('/api/user/updatePassword/v1',{
    method:'POST',
    data:value
  })
}

/**
 * 更新密码
 */
export async function delUser(value:any) {
  return request('/api/user/delUser/'+value)
}

export function uploadImg(file: FormData) {
  return request('/api/open/uploadImg/v1',{
    headers:{
      ContentType:'multipart/form-data'
    },
    processData: false,
    body:file,
    method:'POST'
  })
}
