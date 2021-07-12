import type { Effect, Reducer } from 'umi';
import {history} from 'umi';

export type CurrentUser = {
  Authorization?:string;
  avatar?: string;
  name?: string;
  nickName?:string;
  userid?: string;
  authority?:  'user' | 'other' | 'admin';
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, {  put }) {
      const temp = localStorage ? localStorage.getItem('user') : null;

      if (temp){
        const user = JSON.parse(temp);
        const response = {
          avatar: user.avatar,
          name:user.name,
          nickName:user.nickName,
          userid:user.userid,
          authority:user.authority
        }
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      }else{
        history.push({pathname:'/user/login'})
      }
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default UserModel;
