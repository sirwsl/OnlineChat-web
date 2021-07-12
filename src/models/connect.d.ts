import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';

import type { StateType } from '../pages/User/login/model';

export { GlobalModelState, UserModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
};

export type ConnectState = {

  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: StateType;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;
