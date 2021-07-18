import React, {useEffect, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Col, Divider, Row, Statistic} from 'antd';
import styles from './index.less'
import {ArrowUpOutlined} from "@ant-design/icons";
import './service'
import {getAll} from "@/pages/service";
export default (): React.ReactNode => {

  const [messageData,setMessageData] = useState({now:0,day:0,week:0,month:0});

  // @ts-ignore
  useEffect(async () => {
    const data = await getAll();

    if (data&&data.data){
      setMessageData(data.data);
    }

  },[])

  return (
    <PageContainer>
      <Row>
        <Col span={24}>
          <Card title="注意事项" className={styles.margin}>
            <p>1、该系统基于AntD+springBoot+WebSocket进行开发</p>
            <p>2、该系统仅用于学习、交流使用，不做其他用途，若在使用中出现问题，概不负责</p>
            <p>3、在聊天过程中请文明聊天，不适用不当言论，一经发现严肃处理，若触及违法相关移交公安机关</p>
            <p>4、开发不易请务攻击</p>
            <Divider style={{margin:'10px 0'}}/>
            <p>作者：sirwsl</p>
            <p>开源地址：GitHub： 码云：</p>
            <p>个人博客：<a href="https://www.wslhome.top">https://www.wslhome.top</a>
              CSDN:<a href="https://blog.csdn.net/qq_40432886">sirwsl</a>
            </p>
            <p>其余项目: 商城（秒杀）：<a href="https://kill.wslhome.top">https://kill.wslhome.top</a>
            管理界面：<a href="https://admin.wslhome.top">https://admin.wslhome.top</a></p>
          </Card>
        </Col>

        <Col span={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="在线人数"
                value={messageData.now}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="人"
              />
            </Card>
        </Col>
        <Col span={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="今日活跃"
              value={messageData.day}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="本周活跃"
              value={messageData.week}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={24} sm={12} lg={6} style={{height:'100px'}}>
          <Card>
            <Statistic
              title="本月活跃"
              value={messageData.month}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="人"
            />
          </Card>
        </Col>


      </Row>
    </PageContainer>
  );
};
