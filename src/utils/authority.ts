import { reloadAuthorized } from './Authorized';
import {history} from "umi";
// 使用 localStorage 存储权限信息，在
//
// 实际项目中可能从服务器发送。
export function getAuthority(str?: string): string | string[] {
  const user = typeof str === 'undefined' && localStorage ? localStorage.getItem('user') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (user) {
      authority = JSON.parse(user).authority;
    }else{
      history.push({pathname:'/user/login'})
    }
  } catch (e) {
  }
  return authority;
}

export function setUser(users: any): void {
  if (users){
    localStorage.setItem('user', JSON.stringify(users));
  }
  // auto reload
  reloadAuthorized();
}
