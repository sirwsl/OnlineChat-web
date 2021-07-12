import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import { toClasses } from '../../utils/toClass'
import {Button} from "antd";

export default function HeaderItem({
  type,
  styles,
  selected,
  border,
  contact,
  onClick,
}) {
  return (
    <div
      style={styles}
      className={toClasses([
        style.content,
        border && style.bottom_border,
        selected && style.selected,
      ])}
      onClick={onClick.bind(this, contact)}>
      <img className={style.icon} src={contact.avatar} />
      <div className={style.info_area}>
        <span className={`${style.nickname} ${style.ellipsis}`}>
          {contact.nickname}
        </span>
        {
          // eslint-disable-next-line no-nested-ternary
          type==='0'?(<span className={style.date_area}><Button  className={style.btn} type="primary">私聊</Button></span>):
          type==='1'?(<span className={style.date_area}><Button className={style.btn}>取关</Button></span>):
          type==='2'?(<span className={style.date_area}><Button className={style.btn}>关注</Button></span>):null
        }
      </div>
    </div>
  )
}

HeaderItem.propTypes = {
  contact: PropTypes.object.isRequired,
  className: PropTypes.any,
  style: PropTypes.object,
}

HeaderItem.defaultProps = {
  onClick: () => {},
}
