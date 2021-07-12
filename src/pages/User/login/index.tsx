import {
  LockOutlined, LockTwoTone,
  MailOutlined,
  MobileOutlined, SmileOutlined,
  UserOutlined, VerifiedOutlined,
} from '@ant-design/icons';
import {Alert, message, Tabs, Col, Row, Image} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormCaptcha, ProFormText} from '@ant-design/pro-form';
// @ts-ignore
import { connect, FormattedMessage} from 'umi';
import {getFakeCaptcha} from '@/pages/User/login/service';
import type {Dispatch} from 'umi';
import type {StateType} from '@/pages/User/login/model';
import type {LoginParamsType} from '@/pages/User/login/service';
import type {ConnectState} from '@/models/connect';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);


const Login: React.FC<LoginProps> = (props) => {
  const {userLogin = {}, submitting} = props;
  // @ts-ignore
  const {status, type: loginType} = userLogin;
  const [type, setType] = useState<string>('account');
  const [typeMsg, setTypeMsg] = useState<string>('手机快捷登录');

  const handleSubmit = (values: LoginParamsType) => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values, type},
    });
  };

  const changeType = () => {
    if (type === 'account') {
      setType('mobile');
      setTypeMsg('直接登录');
    } else {
      setType('account');
      setTypeMsg('手机快捷登录');
    }
  }

  // @ts-ignore
  const checkPsd = (rule, value, callback) => {
    // @ts-ignore
    const password = document.getElementById('password').value;
    console.log(password);
    if (password && password !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      callback();
    }
  }

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab='登录'
          />
          <Tabs.TabPane
            key="register"
            tab='注册'
          />
        </Tabs>

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content= '用户名或密码错误，请重新登录' />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              placeholder='账号或手机号'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="VUser"
                      defaultMessage="请输入账号或手机号！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>,
              }}
              placeholder= '请输入密码'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="VPassword"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <Row>
              <Col span={16}>
                <ProFormText
                  name="code"
                  fieldProps={{
                    size: 'large',
                    prefix: <VerifiedOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder='验证码'
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="VCode"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ]}
                />
              </Col>
              <Col span={6} style={{marginLeft: '10px'}}>
                <Image width={100} preview={false}
                       height={38} src='https://test.wslhome.top/verify/getJpg/v1'/>
              </Col>
            </Row>
          </>
        )}

        {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="验证码错误"/>
        )}
        {type === 'mobile' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon}/>,
              }}
              name="mobile"
              placeholder= '请输入手机号'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="VPhone"
                      defaultMessage="请输入手机号!"
                    />
                  ),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: (
                    <FormattedMessage
                      id="errorPhone"
                      defaultMessage="手机号不正确!"
                    />
                  ),
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon}/>,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder='请输入验证码'
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'请输入验证码'}`;
                }
                return  '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="VCode"
                      defaultMessage="请输入验证码！"
                    />
                  ),
                },
              ]}
              onGetCaptcha={async (mobile) => {
                //获取验证码
                const result = await getFakeCaptcha(mobile);
                if (result === false) {
                  return;
                }
                message.success(
                  '获取验证码下发成功，请登录手机号查看: 1234',
                );
              }}
            />
          </>
        )}

        {/* 用户注册 */}
        {status === 'error' && loginType === 'register' && !submitting && (
          <LoginMessage content="注册失败"/>
        )}
        {type === 'register' && (
          <>
            <ProFormText
              name="nickName"
              fieldProps={{
                size: 'large',
                prefix: <SmileOutlined className={styles.prefixIcon}/>,
              }}
              placeholder='昵称'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="VUserNickName"
                      defaultMessage="请为您自己取一个昵称！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              placeholder='登录账号'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="VUser"
                      defaultMessage="请输入账号！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>,
              }}
              placeholder='请输入密码'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="VPassword"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password2"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone className={styles.prefixIcon}/>,
              }}
              placeholder= '请再次输入密码'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="VPassword2"
                      defaultMessage="请输入二次确认密码！"
                    />
                  ),
                },
                {
                  validator: (rule, value, callback) => {
                    checkPsd(rule, value, callback)
                  }
                },
              ]}
            />

            <Row>
              <Col span={16}>
                <ProFormText
                  name="code"
                  fieldProps={{
                    size: 'large',
                    prefix: <VerifiedOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder= '验证码'
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="VCode"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ]}
                />
              </Col>
              <Col span={6} style={{marginLeft: '10px'}}>
                <Image width={100} preview={false}
                       height={38} src='https://test.wslhome.top/verify/getJpg/v1'/>
              </Col>
            </Row>
          </>
        )}

        <div
          style={{
            marginBottom: 24,
          }}
        >

          <a
            style={{
              float: 'right',
            }}
          >

          </a>
        </div>
      </ProForm>
      <Row className={styles.text}>
        <Col span={12} onClick={changeType}>
          <FormattedMessage id="others" defaultMessage={typeMsg}/>
        </Col>
        <Col span={12}>
          <FormattedMessage id="forgets" defaultMessage="忘记密码？"/>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({login, loading}: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
