import request from "@/utils/request";

/**
 * 获取登录人好友
 */
export async function getFriend() {
  return request('/api/user/myFriends/v1');
}

/**
 * 查找好友
 */
export async function getUser(name:string) {
  return request('/api/user/getUser/v1?name='+name);
}

/**
 * 查找聊天室
 */
export async function getRooms(name:string) {
  return request('/api/user/getRoom/v1?name='+name);
}
/**
 * 删除好友
 */
export async function delFriends(id:string) {
  return request('/api/user/cancelFriends/v1?id='+id);
}
/**
 * 删除聊天室
 */
export async function delRooms(id:string) {
  return request('/api/user/rmRoom/v1?roomId='+id);
}

/**
 * 添加群聊
 * @param id
 */
export async function addRooms(id:string){
  return request('/api/user/addRoom/v1',{
    method:'POST',
    data:{'id':id},
  })
}

/**
 * 添加好友
 * @param id
 */
export async function addFriends(id:string){
  return request('/api/user/addFriendById/v1',{
    method:'POST',
    data:{'id':id},
  })
}

/**
 * 创建群聊
 */
export async function createRoom(values: any) {
  return request('/api/user/createRoom/v1',{
    method:'POST',
    data:values
  })
}

