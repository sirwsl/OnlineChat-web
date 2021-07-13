import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import ScrollBarWrapper from '../ScrollBarWrapper/ScrollBarWrapper'
import HeaderItem from "@/components/HeaderItem/HeaderItem";

const HeaderList = React.forwardRef((props, ref) => {
  const [selectId, setSelectId] = useState()
  const selectContactHandle = (con) => {
    setSelectId(con.id)
    props.onSelect && props.onSelect(con)
  }

  return (
    <div className={style.list_area} ref={ref} onScroll={props.onScroll}>
      {props.data.map((contact, index) => (
        <HeaderItem
          contact={contact}
          key={contact.id}
          border={index + 1 !== props.data.length}
          selected={selectId === contact.id}
          onClick={selectContactHandle.bind(this, contact)}
          type={props.type}
        />
      ))}
    </div>
  )
})

export default ScrollBarWrapper(HeaderList)

HeaderList.propTypes = {
  data: PropTypes.array.isRequired,
}
