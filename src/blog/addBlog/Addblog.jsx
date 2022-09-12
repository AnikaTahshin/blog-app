import axios from 'axios';
import React from 'react'
import { useState, useContext } from 'react';
import swal from 'sweetalert';
import "./Addblog.css";
import { DataContext } from '../../DataProvider';
import { useHistory } from 'react-router-dom';


export default function Addblog() {
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [image, setImage] = useState("");
    let [category, setCategory] = useState("");
    let [preveiwImage, setPreviewImage] = useState("");
    let history = useHistory();

    let { token, url } = useContext(DataContext)

    async function handleSubmit(event) {
        event.preventDefault();

        if (!title) {
            swal({
                text: "Title required",
                icon: "error",
            })
            return;
        }
        else if (!category) {
            swal({
                text: "Category required",
                icon: "error",
            })
            return;
        }

        else if (!image) {
            swal({
                text: "Image required",
                icon: "error",
            })
            return;
        }

        else {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("category", category);

            await axios(
                {
                    method: "POST",
                    url: url + "blog",
                    data : formData,
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                }
            ).then((response) => {
                if (response.status == 201) {
                    swal({
                        text: response.data.msg,
                        icon: "success",
                    })
                    history.push("/");
                }
            })



        }



    }

    return (

        <div class="card mb-3 card-style">
            {preveiwImage ?
                <img src={preveiwImage} height={320} width={'100%'} /> :
                <img src='/assets/images/default.jpg' height={320} width={'100%'} />
            }
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <div class="card-body">
                    <h5 class="card-title">Add new blog</h5>
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
