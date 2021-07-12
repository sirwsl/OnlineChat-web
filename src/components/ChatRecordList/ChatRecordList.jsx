import React, { Component } from 'react'
import style from './style.module.css'
import MsgItem from '../MsgItem/MsgItem'
import { toClasses } from '../../utils/toClass'

const ChatRecordList = React.forwardRef((props, ref) => {
  const renderShadow = () => {
    const { isBarHide, scrollTop, thumbHeight, clientHeight } = props

    if (isBarHide) {
      return ''
    }
    if (scrollTop !== 0 && clientHeight - (scrollTop + thumbHeight) !== 0) {
      return style.shadow_vertical
    }
    if (scrollTop === 0) {
      return style.shadow_bottom
    }
    if (scrollTop + thumbHeight === clientHeight) {
      return style.shadow_top
    }
  }

  return (
    <div
      className={toClasses([style.list_area, renderShadow()])}
      ref={ref}
      onScroll={props.onScroll}>
      <div className={style.load_more_area}>
        {props.data.map((bubble) => (
          <MsgItem {...props} data={bubble} key={bubble._id} />
        ))}
      </div>
    </div>
  )
})

export default ChatRecordList
