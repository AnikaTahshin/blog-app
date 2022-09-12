import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert';
import { DataContext } from '../../DataProvider';


export default function UpdateBlog() {
    let { id } = useParams();
    let { url, token, imageUrl } = useContext(DataContext);

    let [title, setTitle] = useState("");
    let [category, setCategory] = useState("");
    let [image, setImage] = useState("");
    let [description, setDescription] = useState("");
    let [preveiwImage, setPreviewImage] = useState("");
    useEffect(() => {
        getBlogs();
    }, [])

    async function getBlogs() {
        await axios({
            method: "GET",
            url: url + "blog/" + id,
            headers: {
                "Authorization": "Bearer " + token,
            }

        }).then((response) => {
            console.log(response);
            let data = response.data.data;
            setTitle(data.title);
            setCategory(data.category);
            setImage(data.image);
            setDescription(data.description);
        })
    }

    async function updateBlog(event){
        event.preventDefault();
        if (!title) {
            
            swal({
                text: "Title required",
                icon: "error"
            })
            return;
        }

        else if (!category) {
            swal({
                text: "Category required",
                icon: "error"
            })
            return;
        }

        else{

            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("category", category);
            
             await axios({
                method: "PUT",
                url: url + "blog/" + id,
                data : formData,
                headers : {
                    "Authorization" : "Bearer " + token,                }

             }).then((response) => {
                if (response.status == 200) {
                    swal({
                        text: response.data.msg,
                        icon: "success",
                    })
                }
             })
        }
        
    }
    return (
        <div class="card mb-3 card-style">
            {preveiwImage ?
                <img src={preveiwImage} height={320} width={'100%'} /> :

                image ?
                    <img src={imageUrl + "blog/" + image} height={320} width={'100%'} /> :
                    <img src='/assets/images/default.jpg' height={320} width={'100%'} />
            }
            <form onSubmit={(e) => {updateBlog(e)}}>
                <div class="card-body">
                    <h5 class="card-title">Update blog</h5>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        <input type="text" class="form-control" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Category {category}</label>
                        <select class="form-select" aria-label="Default select example" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                            <option style={{ display: 'none' }} selected>Select category</option>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Featured Image</label>
                        <input type="file" class="form-control" accept="image/*" defaultValue={image} onChange={(e) => {
                            setImage(e.target.files[0])
                            setPreviewImage(URL.createObjectURL(e.target.files[0]));

                        }} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <button className='btn btn-primary'>Create</button>
                </div>
            </form>
        </div>
    )
}
