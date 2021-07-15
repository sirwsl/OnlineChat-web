import request from '@/utils/request';

export type LoginParamsType = {
  name: string;
  password: string;
  code: string;
  phone: string;
  phoneCode: String;
  sex: String;
  type: String;

};

/**
 * 登录
 * @param params
 */
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/open/login/v1', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取验证码
 * @param mobile
 */
export async function getFakeCaptcha(mobile: string) {
  return request(`/api/open/getCode/v1?phone=${mobile}`);
}
