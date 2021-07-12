import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  code: string;
  phone: string;
  phoneCode: String;
  sex: String;
  type: String;

};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
