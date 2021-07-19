import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import './index.less'
const Index:React.FC = ()=>{

  return <>
    <PageContainer>
      <div className="site-card-border-less-wrapper">
        <Card title="项目介绍" bordered={false} >
          <p><span style={{fontWeight:'bolder'}}>零、作者相关</span></p>
          <p>项目作者：sirwsl</p>
          <p>微信：sirwsl （可以一起交流技术、如果是帮忙看问题就别加了，烦的伤）</p>
          <p>邮箱：sirwsl@163.com （有问题可以进行反馈或者去github提bug）</p>
          <p>一个初出茅庐的码农，该项目为antDesign与webSocket的实验品，喜欢就给个Star吧</p>
          <p><span style={{fontWeight:'bolder'}}>一、技术与框架</span></p>
          <p>1、该Demo整体技术与框架包括：Ant Design Pro、 SpringBoot、WebSocket，但不仅限于以上技术框架</p>
          <p>2、项目整体采用前后端分离模式进行开发，前端主要采用TypeScript+Less文件进行编写，组件采用Ant Design组件进行实现</p>
          <p>3、后端主要为SpringBoot进行实现，但也涉及到Redis、短信等相关内容</p>
          <p>4、项目基本数据存储采用MYSQL形式，聊天记录采用本地localStorage的形式进行存储，如果需要可在此基础上加入mongoDB进行聊天数据持久化</p>
          <p><span style={{fontWeight:'bolder'}}>二、相关地址</span></p>
          <p>1、项目地址：</p>
          <p>GitHub：</p>
          <p>码云：</p>
          <p>2、演示地址：</p>
          <p><a href="https://chat.wslhome.top">https://chat.wslhome.top</a></p>
          <p><span style={{fontWeight:'bolder'}}>三、部署说明</span></p>
          <p>1、项目在拉取后，前端请修改config/proxy.ts文件中的代理与后端运行地址、端口相对应</p>
          <p>2、请修改src/pages/Chat/index.tsx文件中的new WebSocket中的socket请求地址，由于采用WebSocket不知道如何代理，如果有大哥知道，可以滴滴我wx：sirwsl</p>
          <p>3、请修改src/layouts/BasicLayout.tsx文件中的new WebSocket的socket请求地址</p>
          <p><span style={{fontWeight:'bolder'}}>四、个人地址</span></p>
          <p>个人博客：<a href="https://www.wslhome.top">https://www.wslhome.top</a></p>
          <p>CSDN:<a href="https://blog.csdn.net/qq_40432886">sirwsl:https://blog.csdn.net/qq_40432886</a></p>
          <p>商城：<a href="https://kill.wslhome.top">https://kill.wslhome.top</a></p>
          <p>商城后端管理：<a href="https://admin.wslhome.top">https://admin.wslhome.top</a></p>
          <p>码云地址：<a href="https://gitee.com/sirwsl">https://gitee.com/sirwsl</a></p>
          <p>GitHub地址：<a href="https://github.com/sirwsl">https://github.com/sirwsl</a></p>
        </Card>
      </div>
    </PageContainer>
  </>
}

export default Index;
