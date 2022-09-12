import axios from 'axios'
import React from 'react'
import { useContext, useEffect } from 'react'
import { DataContext } from '../DataProvider'
import swal from 'sweetalert';
import { useState } from 'react';
import Bloglist from '../blog/bloglist/Bloglist';


export default function Home() {
    let [blogList, setBlogList] = useState([]);
    let { url } = useContext(DataContext);
    useEffect(() => {
        getBlogs();
    }, [])
    async function getBlogs() {
        await axios({
            method: "GET",
            url: url + "blog",
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                setBlogList(response.data.data);
            }
        }).catch((error) => {
            swal({
                text: "Something went wrong!",
                icon: "error",
            });


        })

    }

    return (
        <div>
            {
                <Bloglist blogs={blogList}/>
            }
        </div>
    )
}
