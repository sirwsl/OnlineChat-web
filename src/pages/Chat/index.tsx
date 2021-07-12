import React, {useEffect, useState} from 'react'

import {contact, contactList, messageList, my} from './fackData'
import Chat from "@/components/Chat/Chat";
import ContactList from "@/components/ContactList/ContactList";
import {Col, message, Row} from "antd";
import {Card} from 'antd';

export type userInfo = {
  id: string,
  avatar: string,
  nickname: string,
  message: string,
  date: string
}

export type finalInfo = {
  type: string,
  data: msgInfo|userInfo,
  id:string
}
export type msgInfo = {
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
  const [chatList, setChatList] = useState([])//聊天列表
  const [nowChat, setNowChat] = useState<userInfo>();//当前聊天界面
  const imageHandle = (imps: any) => {
    console.log(imps)
  }


  const myself = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const userId = myself ? myself.id : "0";
  var chatId = "user." + userId;
  //初始化好友列表
  var chatTemp: userInfo[] = localStorage.getItem(chatId) ? JSON.parse(localStorage.getItem(chatId) as string) : null;
  // @ts-ignore
  if (chatTemp && chatTemp.length > 0) {
    setChatList([...chatList, chatTemp]);
    setNowChat(chatTemp[0]);
  }

  /**
   * 聊天
   */
  let listClient = new WebSocket('ws://localhost:8080/chatMsg/'+userId)
  listClient.onerror = (e: any) => {
    message.warn('网络欠佳，请刷新重试');
  };

  listClient.onmessage = (e: { data:string}) => {
    const getMsg= JSON.parse(e.data);
    const msgId = userId+".msg."+getMsg.formId;
    //如果本地有则不添加
    console.log(getMsg);
    console.log(getMsg.formId+"--------------"+nowChat.id)
    console.log(getMsg.formId==nowChat.id)
    if (getMsg.formId==nowChat.id){
      setMsgList([...msgList,getMsg])
    }
    const userMsg = localStorage.getItem(msgId) ? JSON.parse(localStorage.getItem(msgId) as string) : [];
    localStorage.setItem(msgId, JSON.stringify([...userMsg, JSON.parse(e.data)]));
    //
    // //如果本地没有就添加
    // localStorage.setItem(chatId, JSON.stringify([...chatList, e.data]));
    // setMsgList([...msgList, e.data])
    // localStorage.setItem(msgId, JSON.stringify(msgList));
  };

  const onSendMsg = (msg) => {
    console.log("msg"+JSON.stringify(msg))
    const msgId = userId+ ".msg." + nowChat.id;
    msg.toId = nowChat.id;
    msg.user.id=userId;
    // @ts-ignore
    if (msgId) {
      let list = msgList||[];
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

  return <>
    <Row>
      <Col span={6}>
        <ContactList
          data={contactList}
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
          onSend={(msg: msgInfo) => onSendMsg(msg)}
          onEarlier={() => console.log('EarlierEarlier')}
          onImage={imageHandle}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 5,
          }}
        /> : <Card style={{height: '100%'}}><p style={{textAlign: 'center', margin: 'auto 0'}}>点击好友列表开始聊天吧</p></Card>}

      </Col>
    </Row>
  </>
}

export default Index;
