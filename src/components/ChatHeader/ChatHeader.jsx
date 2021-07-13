import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import {Button, Divider} from "antd";
import {userInfo} from "@/pages/Chat";
export default function ChatHeader(props) {
    const rmObj =(id)=>{
        props.onRm(id);
    }
  return (
        props.data.avatar?<>
        <div className={style.content}>
          <img className={style.avatar} src={props.data.avatar} />
          <div className={style.desc_area}>
            <span className={style.nickname}>{props.data.nickname}</span>
            <span className={style.sologan}>{props.data.desc}</span>
          </div>
            <span onClick={()=>rmObj(props.data.id)} className={style.desc_button}>(关闭)</span>
        </div>
        </>:null
  )
}

ChatHeader.propTypes = {}
