import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import {Card, Col, Divider} from 'antd';
import './index.less'
import { Row } from 'antd';
import { contactList} from "@/pages/Chat/fackData";
import HeaderList from "@/components/HeaderList/HeaderList";

const Index: React.FC = ()=>{

  const onSelectChat = (temp)=>{
    console.log(temp)
  }
  const addChatPage = (temp) =>{
    const myself = localStorage.getItem('user') ?  "user."+JSON.parse(localStorage.getItem('user') as string).id : "";
    let chatList = localStorage.getItem(myself) ? JSON.parse(localStorage.getItem(myself) as string):[];
    chatList.push(temp);
    localStorage.setItem(myself,JSON.stringify(chatList));
  }

  // @ts-ignore
  return <>
    <PageContainer>
      <Row>
        <Col span={5} >
          <Card>
            <Divider>我的群聊</Divider>
            <HeaderList
              type='1'
              data={contactList}
              onSelect={(temp) => addChatPage(temp)}
              style={{
                marginRight: 10,
                height: 400,
                borderRadius: 5,
                overflow: 'hidden',
              }}
            />
          </Card>
        </Col>
        <Col span={5} push={1} >
          <Card>
            <Divider>我的好友</Divider>
            <HeaderList
              type='0'
              data={contactList}
              onSelect={(temp) => onSelectChat(temp)}
              style={{
                marginRight: 10,
                height: 400,
                borderRadius: 5,
                overflow: 'hidden',
              }}
            />
          </Card>
        </Col>
        <Col span={5} push={2} >
          <Card>
            <Divider>我的关注</Divider>
            <HeaderList
              type='10'
              data={contactList}
              onSelect={(temp) => onSelectChat(temp)}
              style={{
                marginRight: 10,
                height: 400,
                borderRadius: 5,
                overflow: 'hidden',
              }}
            />
          </Card>
        </Col>
        <Col span={5} push={3}>
          <Card>
          <Divider>关注我的</Divider>
          <HeaderList
            type='11'
            onSelect={(temp) => onSelectChat(temp)}
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
