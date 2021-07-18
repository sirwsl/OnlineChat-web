import {PageContainer} from '@ant-design/pro-layout';
import React, {useEffect, useState} from 'react';
import {Card, Col, Divider, Form, Input, List, message, Radio, Upload} from 'antd';
import styles from './index.less'
import {Row} from 'antd';
import HeaderList from "@/components/HeaderList/HeaderList";
import {Button} from 'antd';
import {Modal} from 'antd';
import {Avatar} from 'antd';
import {
  addFriends,
  addRooms,
  createRoom,
  delFriends,
  delRooms,
  getFriend,
  getRooms,
  getUser
} from "@/pages/Friends/service";
import {updateBaseInfo, uploadImg} from "@/pages/Info/service";

const {Search} = Input;

const Index: React.FC = () => {

  const [friends, setFriends] = useState({room: [], myFriends: []});
  const [userInfo, setUserInfo] = useState({id:'',nickName: '', name: '', sex: '', headImg: ''});
  const [roomInfo, setRoomInfo] = useState();
  const [flag, setFlag] = useState('0');
  const [headImg, setHeadImg] = React.useState();


  useEffect(() => {
    getFriends();
  }, [])

  const getFriends = async () => {
    let friends = await getFriend();
    if (friends&&friends.code === 0) {
      setFriends(friends.data);
    }
  }

  const delFriend = async (id: string)=>{

    const re = await delFriends(id);
      if(re.code === 0){
        friends.myFriends = re.data.myFriends;
        setFriends(friends);
      }else{
        message.error("删除失败");
      }
    setIsModalVisible3(false);
    }


  const delRoom= async (id: string)=>{
    const re = await delRooms(id);
    if(re.code === 0){
      message.success(re.data);
      let friend = friends.room.filter(obj => obj.id !==id)
      friends.room = friend;
      setFriends(friends);
    }else{
      message.error("删除失败");
    }
    setIsModalVisible4(false);
  }

  const getUserInfo = async (name: string) => {
    let userInfos = await getUser(name);
    if (userInfos.data) {
      if (userInfos.data.sex) userInfos.data.sex = '男';
      else userInfos.data.sex = '女'
    }
    setUserInfo(userInfos.data);
    setFlag('1');
  }

  const getRoom = async (name: string) => {
    let room = await getRooms(name);
    if (room&&room.data&&room.code === 0){
      setRoomInfo(room.data);
      setFlag('2');
    }
  }


  const addChatPage = (temp: any) => {
    const myself = localStorage.getItem('user') ? "user." + JSON.parse(localStorage.getItem('user') as string).id : "";
    let chatList = localStorage.getItem(myself) ? JSON.parse(localStorage.getItem(myself) as string) : [];
    chatList.push(temp);
    localStorage.setItem(myself, JSON.stringify(chatList));
  }

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);
  const [isModalVisible5, setIsModalVisible5] = useState(false);

  const handleCancel1 = () => {
    setIsModalVisible1(false);
    setFlag('0');
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
    setFlag('0');
  };
  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };
  const handleCancel4 = () => {
    setIsModalVisible4(false);
  };
  const handleCancel5 = () => {
    setIsModalVisible5(false);
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
  const showModal5 = () => {
    setIsModalVisible5(true);
  };


  const addRoom = async (id: string)=>{
    const re = await addRooms(id);

    if (re&&re.code === 0) {
      message.success("添加群聊成功", 5);
      setFriends(re.data);
      setIsModalVisible2(false);
    }


  }

  const addFriend = async (id: string)=>{
   const re = await addFriends(id);
    if (re.code === 0){
      message.success("添加好友成功",5);
      setIsModalVisible1(false);
      setFriends(re.data);
    }
  }

  const onFinishInfo = async (values: any) => {
    var newVar = await createRoom(values);
    if (newVar&&newVar.code === 0){
      message.success("创建群聊成功",5)
      setIsModalVisible5(false);
      getFriends();
    }else {
      message.error("创建失败，请更换账号重试",5);
    }

  };


  const props = {
    showUploadList: false,//设置只上传一张图片，根据实际情况修改
    customRequest: async (info: { file: any}) => {
      const formData = new FormData();
      formData.append('multipartFile', info.file);
      let newVar = await uploadImg(formData);
      setHeadImg(newVar.data);
    }
  };


  return <>
    <PageContainer>
      <Row>
        <Col span={8}>
          <Card>
            <Divider>我的群聊</Divider>
            <HeaderList
              type='1'
              data={friends.room}
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

        <Col span={8} push={2}>
          <Card>
            <Divider>我的好友</Divider>
            <HeaderList
              type='0'
              data={friends.myFriends}
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
        <Col span={4} push={4}>
          <Card>
            <Button type="primary" block onClick={showModal1} className={styles.btn}>
              添加好友
            </Button>
            <Modal title="添加好友" visible={isModalVisible1} footer={null} onCancel={handleCancel1}>
              {
                flag === '1' ? (<>
                  <div>
                    <Row style={{textAlign: 'center'}}>
                      <Col span={24} style={{margin: '0 0 10px 0'}}>
                        <Avatar src={userInfo.headImg}/>
                      </Col>
                      <Col span={8}>
                        <div>昵称：{userInfo.nickName}</div>
                      </Col>
                      <Col span={8}>
                        <div>账号：{userInfo.name}</div>
                      </Col>
                      <Col span={8}>
                        <div>性别：{userInfo.sex}</div>
                      </Col>
                      <Col span={24} style={{margin: '10px 0'}}>
                        <Button type="primary" onClick={()=>addFriend(userInfo.id)}>添加</Button>
                      </Col>
                    </Row>
                  </div>
                </>) : <Search
                  placeholder="请输入好友账号"
                  allowClear
                  enterButton="查找"
                  size="large"
                  onSearch={getUserInfo}
                />
              }
            </Modal>

            <Button type="primary" block onClick={showModal2} className={styles.btn}>
              添加群聊
            </Button>
            <Modal title="添加群聊" visible={isModalVisible2} footer={null} onCancel={handleCancel2}>
              {
                flag === '2' ? (<>
                  <div>
                    <Row style={{textAlign: 'center'}}>
                      <Col span={24} style={{margin: '0 0 10px 0'}}>
                        <Avatar src={roomInfo.headImg}/>
                      </Col>
                      <Col span={12}>
                        <div>群名称：{roomInfo.nickName}</div>
                      </Col>
                      <Col span={12}>
                        <div>账号：{roomInfo.name}</div>
                      </Col>
                      <Col span={24}>
                        <div>简介：{roomInfo.detail}</div>
                      </Col>
                      <Col span={24} style={{margin: '10px 0'}}>
                        <Button type="primary" onClick={()=>{addRoom(roomInfo.id)}}>添加</Button>
                      </Col>
                    </Row>
                  </div>
                </>) : <Search
                  placeholder="请输入房间号"
                  allowClear
                  enterButton="查找"
                  size="large"
                  onSearch={getRoom}
                />
              }


            </Modal>
            <Button type="primary" block onClick={showModal3} className={styles.btn}>
              管理好友
            </Button>
            <Modal title="管理好友" visible={isModalVisible3} footer={null} onCancel={handleCancel3}>
              <List
                itemLayout="horizontal"
                dataSource={friends.myFriends}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar}/>}
                      title={<Row>
                        <Col span={20}>
                          <p>{item.nickName}</p>
                        </Col>
                        <Col span={4}>
                          <Button danger onClick={()=>delFriend(item.id)}>删除</Button>
                        </Col>
                      </Row>}
                    />
                  </List.Item>
                )}
              />
            </Modal>
            <Button type="primary" block onClick={showModal4} className={styles.btn}>
              管理群聊
            </Button>
            <Modal title="管理群聊" visible={isModalVisible4} footer={null} onCancel={handleCancel4}>
              <List
                itemLayout="horizontal"
                dataSource={friends.room}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar}/>}
                      title={<Row>
                        <Col span={20}>
                          <p>{item.nickName}</p>
                        </Col>
                        <Col span={4}>
                          <Button danger onClick={()=>delRoom(item.id)}>删除</Button>
                        </Col>
                      </Row>}
                    />
                  </List.Item>
                )}
              />
            </Modal>

            <Button type="primary" block onClick={showModal5} className={styles.btn}>
              创建群聊
            </Button>
            <Modal title="创建群聊" visible={isModalVisible5} footer={null} onCancel={handleCancel5}>
              <>
                <Form
                  name="basic"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 8}}
                  onFinish={onFinishInfo}
                >
                  <Form.Item wrapperCol={{offset: 8, span: 8}} >
                    <div style={{textAlign: 'center'}}>
                      <Avatar size={64} src={headImg} style={{margin: '0 auto'}}/>
                    </div>
                    <div style={{textAlign: 'center', margin: '10px 0', color: 'blue'}}>
                      <Upload  {...props}>设置头像</Upload>
                    </div>
                  </Form.Item>

                  <Form.Item name='id' style={{display: "none"}}>
                    <Input disabled/>
                  </Form.Item>
                  <Form.Item
                    label="群聊账号"
                    name="name"
                    rules={[{required: true, message: '群聊账号不能为空!'}]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="群名称"
                    name="nickName"
                    rules={[{required: true, message: '群名称不能为空!'}]}>
                    <Input/>
                  </Form.Item>
                  <Form.Item
                    label="群简介"
                    name="detail"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{offset: 8, span: 8}} style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit" style={{margin: '0 10px'}}>
                      提交
                    </Button>
                  </Form.Item>
                </Form>
              </>

            </Modal>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  </>
}
export default Index;
