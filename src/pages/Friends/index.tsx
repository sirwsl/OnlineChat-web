import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import {Card, Col, Divider} from 'antd';
import './index.less'
import { Row } from 'antd';
import { contactList} from "@/pages/Chat/fackData";
import HeaderList from "@/components/HeaderList/HeaderList";

const Index: React.FC = ()=>{

  // @ts-ignore
  return <>
    <PageContainer>
      <Row>
        <Col span={7} >
          <Card>
            <Divider>我的好友</Divider>
            <HeaderList
              type='0'
              data={contactList}
              style={{
                marginRight: 10,
                height: 400,
                borderRadius: 5,
                overflow: 'hidden',
              }}
            />
          </Card>
        </Col>
        <Col span={7} push={1} >
          <Card>
            <Divider>我的关注</Divider>
            <HeaderList
              type='1'
              data={contactList}
              style={{
                marginRight: 10,
                height: 400,
                borderRadius: 5,
                overflow: 'hidden',
              }}
            />
          </Card>
        </Col>
        <Col span={7} push={2}>
          <Card>
          <Divider>关注我的</Divider>
          <HeaderList
            type='2'
            data={contactList}
            style={{
              marginRight: 10,
              height: 400,
              borderRadius: 5,
              overflow: 'hidden',
            }}
          />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  </>
}
export default Index;
