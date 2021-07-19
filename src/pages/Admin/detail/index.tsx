import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import './index.less'
const Index:React.FC = ()=>{

  return <>
    <PageContainer>
      <div className="site-card-border-less-wrapper">
        <Card title="使用说明" bordered={false} >
          <p>1、用户进行登录注册、在注册后默认会添加系统默认聊天室提供大家交流</p>
          <p>2、体验用户可以进行注册多个账号进行体验</p>
          <p>3、用户对账号进行手机绑定后可以进行手机验证码登录</p>
          <p>4、忘记密码后联系微信：sirwsl进行修改（PS：因为不想写那么多无聊的代码，所以省略了该部分）</p>
          <p>5、用户注册后默认只有聊天室没有好友、可以邀约朋友一起注册，注册后在“我的好友中进行账号查找”</p>
          <p>6、本项目仅为Demo将提供长期演示、但禁止进行违法乱纪活动交流、否则移交公安机关以及司法部门</p>
          <p>7、项目默认聊天室账号默认有：chat1、chat2、chat3....chat9 九个聊天室，默认会添加四个、有需要可以自己进行聊天室创建或添加</p>
          <p>注意：</p>
          <p style={{fontWeight:'bolder'}}>1、聊天相关所有内容均采用本地localStorage的形式进行存储，服务端没有进行任何聊天记录存储，因此该系统聊天记录、聊天好友仅在本地存储、如果清除历史记录
          或者清除localStorage后聊天记录将会清空、不支持任何形式恢复</p>
          <p>2、系统已在GitHub与码云中进行开源，相关业务感兴趣可以自己pull进行查看</p>
          <p>3、该系统将不会收取任何的个人信息、如进行手机号绑定的将会进行严格保密、不做任何商业用途</p>
        </Card>
      </div>
    </PageContainer>
  </>
}

export default Index;
