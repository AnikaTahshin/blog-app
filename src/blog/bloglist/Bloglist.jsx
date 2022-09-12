import React from 'react'
import "./Bloglist.css";
import Blogitem from '../Blogitem/Blogitem';
export default function Bloglist({blogs}) {
  return (
    <div className='blogList-wrap'>
      {
        blogs.map((item, index) => {
          return(
            <Blogitem blog={item}/>
          )
        })
      }
    </div>
  )
}
