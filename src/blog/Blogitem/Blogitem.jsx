import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./Blogitem.css"
import { DataContext } from '../../DataProvider'
import { useHistory } from 'react-router-dom'


export default function Blogitem({ blog }) {
  let { imageUrl, id } = useContext(DataContext);
  let history = useHistory();
  return (
    <div className='blogItem-wrap'>
      <Link to={"/blog-details/" + blog._id}>{
        blog.image ? <img className='blogItem-cover' src={imageUrl + "blog/" + blog.image} alt='cover' /> :
          <img className='blogItem-cover' src={'/assets/images/default.jpg'} alt='avatar' />
      }

      </Link>
      <p className='chip'>
        <span>{
          blog.category
        }</span>
      </p>

      {
        (blog.authorId._id == id) ? 
        <div>

          <span style={{ float: 'right', position: 'relative', bottom: '45px' }} className="m-1">
            <i class="fa-solid fa-trash-can" style={{ cursor: 'pointer' }}></i>
          </span>
          <span onClick={() => {history.push("/update-blog/" + blog._id)}} style={{ float: 'right', position: 'relative', bottom: '45px' }} className="m-1">
            <i class="fa-solid fa-pen-to-square" style={{ cursor: 'pointer' }}></i>
          </span>
        </div> : ""
      }

      <Link to={"/blog-details/" + blog._id}><h3>{blog.title}</h3></Link>

      <p className='blogItem-desc'>{blog.description}</p>
      <footer>
        <div className='blogItem-author'>
          {
            blog.authorId.profilePic ? <img src={imageUrl + "user/" + blog.authorId.profilePic} alt='avatar' /> :
              <img src={'/assets/images/author.jpg'} alt='avatar' />

          }
          <div>
            <h6>{blog.authorId.userName ? blog.authorId.userName : "N/A"}</h6>
            <p>{blog.createdAt}</p>
          </div>
        </div>
        <Link className='blogItem-link' to={"/blog-details/" + blog._id}>
          ➝
        </Link>
      </footer>
    </div>
  )
}
