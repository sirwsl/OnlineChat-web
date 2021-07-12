import React from 'react';
import type { ConnectProps } from 'umi';
import { Redirect, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';

type SecurityLayoutProps = {
  loading?: boolean;
  currentUser?: CurrentUser;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
};

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetch',
      });
    }
  }

  render() {
    const { children } = this.props;
    // 您可以将其替换为您的身份验证规则（例如检查令牌是否存在）
    // 可以替换成自己的登录认证规则（比如判断token是否存在）
    const isLogin = localStorage.getItem('user')
    if (!isLogin) {
      return <Redirect to={`/user/login`} />;
    }
    return children;
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(SecurityLayout);
