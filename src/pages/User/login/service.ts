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

export async function fakeAccountLogin(params: LoginParamsType) {
  params.type = 'account';
  return request('/api/open/login/v1', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
