/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout, {DefaultFooter} from '@ant-design/pro-layout';
import React, {useEffect, useMemo, useRef} from 'react';
import type {Dispatch} from 'umi';
import {Link, connect, history} from 'umi';
import {GithubOutlined} from '@ant-design/icons';
import {Result, Button, message} from 'antd';
import Authorized from '@/utils/Authorized';
import type {ConnectState} from '@/models/connect';
import {getMatchMenu} from '@umijs/route-utils';
import logo from '../assets/logo.svg';
import RightContent from "@/components/GlobalHeader/RightContent";

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="抱歉，您无权访问此页面。"
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
} & ProLayoutProps;

/** Use Authorized check all menu item */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} Produced by sirwsl Experience Technology Department`}
    links={[
      {
        key: '聊天系统Demo',
        title: '聊天系统Demo',
        href: 'https://chat.wslhome.top',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined/>,
        href: 'https://github.com/sirwsl',
        blankTarget: true,
      },
      {
        key: '个人博客',
        title: '个人博客',
        href: 'https://www.wslhome.top',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/index',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetch',
      });
    }
  }, []);
  /**
   * socket
   */
  useEffect(()=>{
    const myself = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    const userId = myself ? myself.id : "0";
    let client = new WebSocket('ws://localhost:8080/socket/'+userId);
// 报错的回调函数
    client.onerror = (e: any) =>{
      message.warning('网络连接失败，请稍后再试');
      console.log('Connection Error');
      console.log(e)
    }
//收到消息的处理函数
    client.onmessage = (e: { data: any; })=> {
      if (e!=null){
        message.success("欢迎用户 【"+e.data+"】 进入系统")
      }
    }
  },[])
  /** Init variables */

    // get children authority
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
    );

  return (
    <ProLayout
      logo={logo}
      {...props}
      {...settings}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => {
        if (settings.footerRender || settings.footerRender === undefined) {
          return defaultFooterDom;
        }
        return null;
      }}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent/>}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
      waterMarkProps={{
        content: 'sirwsl',
        fontColor: 'rgba(24,144,255,0.15)',
      }}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({settings}: ConnectState) => ({
  settings,
}))(BasicLayout);
