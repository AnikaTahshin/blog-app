import { useParams } from "react-router-dom"
import React, { useState } from 'react'
import axios from "axios";
import { DataContext } from "../../DataProvider";
import { useContext } from "react";
import { useEffect } from "react";
import "./blogDetails.css";
export default function BlogDetails() {
    useEffect(() => {
        getData()
    }, [])
    let { id } = useParams();
    let { url, token, imageUrl } = useContext(DataContext);
    let [blogData, setblogData] = useState("");

    // let id = useParams().id;
    // console.log(id);

    async function getData() {
        await axios({
            method: "GET",
            url: url + "blog/" + id,
            headers: {
                'Authorization': "Bearer " + token
            }
        }).then((response) => {
            console.log(response);
            setblogData(response.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div>
            {blogData ?
            <div className='blog-wrap'>
                <header>
                    <p className='blog-date'>{blogData.createdAt}</p>
                    <h1>{blogData.title}</h1>
                    <div className='blog-subCategory'>
                        <div>
                            <p className='chip'>{blogData.category}</p>
                        </div>
                    </div>
                </header>
                {
                    blogData.image ? <img className='blogItem-cover' src={imageUrl + "blog/" + blogData.image} alt='cover' /> : 
                    <img className='blogItem-cover' src={'/assets/images/default.jpg'} alt='cover' />

                }

                <footer>
                    <div className='blogItem-author'>
                        <img src={'/assets/images/author.jpg'} alt='avatar' />
                        <div>
                            <h6>{blogData.authorId?.userName}</h6>
                            <p>{blogData.createdAt}</p>
                        </div>
                    </div>
                </footer>
                <p className='blog-desc'>{blogData.description}</p>
            </div> :
            "Loading"}
        </div>
    )
}
