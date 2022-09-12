import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react'
import { DataContext } from '../../DataProvider'
import Bloglist from '../bloglist/Bloglist';


export default function UserBlog() {
    let { url, token } = useContext(DataContext);
    let [data, setData] = useState({});

    useEffect(() => {
        getUserBlogs();
    }, [])

    async function getUserBlogs() {
        await axios({
            method: "GET",
            url: url + "blog/users-blog",
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            console.log(response);
            setData(response.data.data);

        })
    }
    return (
        <div>
            {
               ( data && data.length > 0 ) ? <Bloglist blogs={data} /> : "No Data Found"
            }
        </div>
    )
}
