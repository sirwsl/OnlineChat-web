import React, {useEffect, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Col, Row, Statistic} from 'antd';
import styles from './index.less'
import {ArrowUpOutlined} from "@ant-design/icons";
import { history } from 'umi';

export default (): React.ReactNode => {

  const [messageData,setMessageData] = useState();

  useEffect(()=>{
    const data = history.location.state?history.location.state:0;
    setMessageData(data)
  },[])

  return (
    <PageContainer>
      <Row>
        <Col span={24}>
          <Card title="注意事项" className={styles.margin}>
            <p>该系统基于AntD+springBoot+WebSocket进行开发</p>
            <p>开发不易请务攻击</p>
          </Card>
        </Col>

        <Col span={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="在线人数"
                value={messageData}
                precision={2}
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
              value={11.28}
              precision={2}
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
              value={11.28}
              precision={2}
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
              value={11.28}
              precision={2}
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
