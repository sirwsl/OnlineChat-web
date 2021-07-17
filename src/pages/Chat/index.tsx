import React, {useEffect, useState} from 'react'

import Chat from "@/components/Chat/Chat";
import ContactList from "@/components/ContactList/ContactList";
import { Col, message, notification, Result, Row} from "antd";
import {Card} from 'antd';
import {SmileOutlined} from "@ant-design/icons";

export type userInfo = {
  type:string;
  id: string,
  avatar: string,
  nickname: string,
  message: string,
  date: string
}

export type msgInfo = {
  type:string;
  formId: string,
  toId: string,
  _id: string,
  date: number,
  user: {
    id: string,
    avatar: string,
    nickname: string,
    desc: string,
  },
  message: { type: string, content: string }
}


const Index: React.FC = () => {

  const [msgList, setMsgList] = useState([])//聊天内容
  const [chatList, setChatList] = useState<userInfo[]>([])//聊天列表
  const [nowChat, setNowChat] = useState<userInfo>();//当前聊天界面


  const myself = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const userId = myself ? myself.id : "0";
  const chatId = "user." + userId;
  //初始化好友列表
  useEffect(()=>{
    let chatTemp: userInfo[] = localStorage.getItem(chatId) ? JSON.parse(localStorage.getItem(chatId) as string) : [];
    setChatList(chatTemp);
    if (chatTemp.length > 0)setNowChat(chatTemp[0]);
  },[])


  /**
   * 聊天
   */
  let listClient = new WebSocket('ws://localhost:8080/chatMsg/'+userId)
  listClient.onerror = (e: any) => {
    message.warn('网络欠佳，请刷新重试');
  };

  listClient.onmessage = (e: { data:string}) => {
    const getMsg= JSON.parse(e.data);
    if (getMsg.type =='msg'){
      //如果本地没有，请求返回当前人
      let flag = true;
      chatList.forEach(li =>{
        if (li.id==getMsg.formId){
          flag = false;
          return;
        }
      })
      if (flag) listClient.send(JSON.stringify({type:'user',id:getMsg.formId,data:null}))
      //请求结束继续执行
      if (getMsg.message.type =='text'){
        notification.open({
          key:'message',
          message: '您收到一条来自 【'+getMsg.user.nickname+"】 的消息：",
          description: getMsg.message.content,
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      }
      const msgId = userId+".msg."+getMsg.formId;
      if (nowChat&&getMsg.formId==nowChat.id){

        // @ts-ignore
        setMsgList([...msgList,getMsg])
      }
      const userMsg = localStorage.getItem(msgId) ? JSON.parse(localStorage.getItem(msgId) as string) : [];
      localStorage.setItem(msgId, JSON.stringify([...userMsg, JSON.parse(e.data)]));

    }else if (getMsg.type == 'user'){
      let chatTemp: userInfo[] = localStorage.getItem(chatId) ? JSON.parse(localStorage.getItem(chatId) as string) : [];
      chatTemp.push(getMsg);
      setChatList(chatTemp);
    }else if(getMsg.type =='error'){
      message.warning({
        content: getMsg.msg,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      }).then(r => null);
    }
  };

  const onSendMsg = (msg: { type?: string; formId?: string; toId: any; _id?: string; date?: number; user: any; message?: { type: string; content: string; }; }) => {
    // @ts-ignore
    const msgId = userId+ ".msg." + nowChat.id;
    // @ts-ignore
    msg.toId = nowChat.id;
    msg.user.id=userId;
    // @ts-ignore
    if (msgId) {
      let list = msgList||[];
      // @ts-ignore
      list.push(msg);
      setMsgList(list)
      localStorage.setItem(msgId, JSON.stringify(list));
      listClient.send(JSON.stringify({id: "", type: 'msg', data: msg}));
    }
  }

  const onSelectChat = (user: userInfo) => {

      const msgId = userId + ".msg." + user.id;
      const userMsg = localStorage.getItem(msgId) ? JSON.parse(localStorage.getItem(msgId) as string) : [];
      setMsgList(userMsg);
      setNowChat(user);
  }

  const omRm =(id:string)=>{
    let chatTemp = chatList;
    var userInfos = chatTemp.filter(obj => obj.id !== id);
    if (userInfos.length>0){
      setNowChat(userInfos[0])
    }else{
      setNowChat(null);
    }
    setChatList(userInfos);
    localStorage.setItem(chatId,JSON.stringify(userInfos));
  }

  return <>
    <Row>
      <Col span={6}>
        <ContactList
          data={chatList}
          onSelect={(temp: userInfo) => onSelectChat(temp)}
          style={{
            marginRight: 10,
            height: "600px",
            borderRadius: 5,
            overflow: 'hidden',
          }}
        />
      </Col>

      <Col span={18}>
        {nowChat ? <Chat
          contact={nowChat}
          me={myself}
          chatList={msgList}
          onRm={(id:string)=>omRm(id)}
          onSend={(msg: msgInfo) => onSendMsg(msg)}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 5,
          }}
        /> : <Card style={{height: '100%'}}>
          <Result style={{marginTop:100}}
            title="快开始你的聊天之旅吧"
          />
        </Card>}

      </Col>
    </Row>
  </>
}

export default Index;
