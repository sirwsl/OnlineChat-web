import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import ChatHeader from '../ChatHeader/ChatHeader'
import ChatInput from '../ChatInput/ChatInput'
import ChatRecordList from '../ChatRecordList/ChatRecordList'
import ScrollBarWrapper from '../ScrollBarWrapper/ScrollBarWrapper'

const textHeight = 150

const WrappedChatRecordList = ScrollBarWrapper(ChatRecordList)

export default class Chat extends Component {
  static propTypes = {
    onSend: PropTypes.func.isRequired,
    onRm: PropTypes.func.isRequired,
    me: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
  }

  static defaultProps = {
    style: {
      width: 600,
      height: 500,
    },
    contact: {},
    me: {},
    chatList: [],
    onSend: (msg) => console.warn('传入onSend属性，用于接收输入框内容', msg),
  }

  chatRecordList = React.createRef()

  sendHandle = (msgData) => {
    this.props.onSend(msgData)
    this.chatRecordList.current.computeHeight()
  }

  rmi = (msgData)=>{
    this.props.onRm(msgData);
  };

  render() {
    const listHeight =380;

    return (
      <div className={style.content} style={this.props.style}>
        <ChatHeader onRm = {this.rmi} data={this.props.contact} />

        <WrappedChatRecordList
          {...this.props}
          ref={this.chatRecordList}
          data={this.props.chatList}
          height={listHeight}
          style={{ height: listHeight }}
          bottom
        />
        <ChatInput
          {...this.props}
          height={textHeight}
          onSend={this.sendHandle}
        />
      </div>
    )
  }
}
