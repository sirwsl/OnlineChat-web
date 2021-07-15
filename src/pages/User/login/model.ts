import type {Reducer, Effect} from 'umi';
import {history} from 'umi';

import {fakeAccountLogin, registered} from './service';
import {setUser} from '@/utils/authority';
import {message} from 'antd';
import {CurrentUser} from "@/models/user";


export type StateType = {
  code?: number,
  status: 'SUCCESS'| 'error';
  userMsg?: string,
  data?: CurrentUser
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};


const Model: LoginModelType = {
  namespace: 'login',

  state: {
    // @ts-ignore
    status: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      /**
       * 登录/注册
       * account:直接登录
       *
       */
      console.log(payload)
      if (payload.type === "register") {//注册
        const response = yield call(registered, payload);
        console.log(response);
        if(response.msg === 'SUCCESS' && response.code ===0){
          message.success('🎉 🎉 🎉  注册成功请重新登录！',5);
          window.location.href = '/';
        }
      } else {//登录
        const response = yield call(fakeAccountLogin, payload);

        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        // Login successfully
        if (response.msg === 'SUCCESS' && response.code===0) {
          message.success('🎉 🎉 🎉  登录成功！');
          history.push({pathname:'/index'});
        }
      }
    },

    logout() {
      // 注意：可能存在安全问题，请注意
      localStorage.removeItem('user');
      if (window.location.pathname !== '/user/login') {
        history.replace({
          pathname: '/user/login',
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setUser(payload.data);
      return {
        ...state,
        status: payload.msg,
        data:payload.data,
        userMsg:payload.userMsg
      };
    },
  },
};

export default Model;
