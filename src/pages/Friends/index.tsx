import { PageContainer } from '@ant-design/pro-layout';
import React, {useState} from 'react';
import {Card, Col, Divider, Input, List} from 'antd';
import styles from './index.less'
import { Row } from 'antd';
import { contactList} from "@/pages/Chat/fackData";
import HeaderList from "@/components/HeaderList/HeaderList";
import { Button } from 'antd';
import { Modal } from 'antd';
import { Avatar } from 'antd';

const { Search } = Input;

const Index: React.FC = ()=>{


  const addChatPage = (temp: any) =>{
    const myself = localStorage.getItem('user') ?  "user."+JSON.parse(localStorage.getItem('user') as string).id : "";
    let chatList = localStorage.getItem(myself) ? JSON.parse(localStorage.getItem(myself) as string):[];
    chatList.push(temp);
    localStorage.setItem(myself,JSON.stringify(chatList));
  }

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };
  const handleCancel4 = () => {
    setIsModalVisible4(false);
  };
  const showModal1 = () => {
    setIsModalVisible1(true);
  };
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const showModal3 = () => {
    setIsModalVisible3(true);
  };
  const showModal4 = () => {
    setIsModalVisible4(true);
  };



  const onSearch = (value: any) => console.log(value);

  const data = [
    {
      id:1,
      name: 'Ant Design Title 1',
    },
    {
      id:1,
      name: 'Ant Design Title 2',
    },
    {
      id:1,
      name: 'Ant Design Title 3',
    },
    {
      id:1,
      name: 'Ant Design Title 4',
    },
  ];

  return <>
    <PageContainer>
      <Row>
        <Col span={8}>
          <Card>
            <Divider>我的群聊</Divider>
            <HeaderList
              type='1'
              data={contactList}
              onSelect={(temp: any) => addChatPage(temp)}
              style={{
                marginRight: 10,
                height: 400,
                borderRadius: 5,
                overflow: 'hidden',
              }}
            />
          </Card>
        </Col>

        <Col span={8} push={2} >
          <Card>
            <Divider>我的好友</Divider>
            <HeaderList
              type='0'
              data={contactList}
              onSelect={(temp: any) => addChatPage(temp)}
              style={{
                marginRight: 10,
                height: 400,
                borderRadius: 5,
                overflow: 'hidden',
              }}
            />
          </Card>
        </Col>
        <Col span={4} push={4} >
          <Card>
            <Button type="primary" block onClick={showModal1} className={styles.btn} >
              添加好友
            </Button>
            <Modal title="添加好友" visible={isModalVisible1} footer={null} onCancel={handleCancel1}>
              <Search
                placeholder="请输入好友账号"
                allowClear
                enterButton="查找"
                size="large"
                onSearch={onSearch}
              />
            </Modal>

            <Button type="primary" block onClick={showModal2} className={styles.btn}>
              添加群聊
            </Button>
            <Modal title="添加群聊" visible={isModalVisible2} footer={null} onCancel={handleCancel2}>
              {/*<Search*/}
              {/*  placeholder="请输入群聊账号"*/}
              {/*  allowClear*/}
              {/*  enterButton="查找"*/}
              {/*  size="large"*/}
              {/*  onSearch={onSearch}*/}
              {/*/>*/}
              <>
              <div>
                <Row style={{textAlign:'center'}}>
                  <Col span={24} style={{margin:'0 0 10px 0'}}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  </Col>
                  <Col span={8}>
                    <div>昵称：这就是一个个昵称</div>
                  </Col>
                  <Col span={8}>
                    <div>账号：sitrwsdl125</div>
                  </Col>
                  <Col span={8}>
                    <div>性别：男</div>
                  </Col>
                  <Col span={24} style={{margin:'10px 0'}}>
                    <Button>添加</Button>
                  </Col>
                </Row>
              </div>
              </>
            </Modal>
            <Button type="primary" block onClick={showModal3} className={styles.btn} >
              管理好友
            </Button>
            <Modal title="添加好友" visible={isModalVisible3} footer={null} onCancel={handleCancel3}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<Row>
                        <Col span={20}>
                          <p>{item.name}</p>
                        </Col>
                        <Col span={4}>
                          <Button danger>删除</Button>
                        </Col>
                      </Row>}
                    />
                  </List.Item>
                )}
              />
            </Modal>
            <Button type="primary" block onClick={showModal4} className={styles.btn} >
              管理群聊
            </Button>
            <Modal title="添加好友" visible={isModalVisible4} footer={null} onCancel={handleCancel4}>

            </Modal>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  </>
}
export default Index;
