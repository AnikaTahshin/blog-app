import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react'
import { DataContext } from '../DataProvider'
import "./Profile.css"
import swal from 'sweetalert';

export default function Profile() {
    let { url, token, imageUrl } = useContext(DataContext);
    let [userData, setUserData] = useState({});
    let [showForm, setShowForm] = useState(false);
    let [name, setName] = useState("");
    let [userName, setUsername] = useState("");
    let [phone, setPhn] = useState("");
    let [address, setAddress] = useState("");
    let [gender, setGender] = useState("");
    let [previewImg, setPreviewImg] = useState("");
    let [featuredImg, setFeaturedImg] = useState("");
    useEffect(() => {
        getUser();
    }, [])

    async function getUser() {
        await axios({
            method: "GET",
            url: url + "user/profile",
            headers: {
                "Authorization": "Bearer " + token,
            }

        }).then((response) => {
            console.log(response);
            setUserData(response.data.data);
            let data = response.data.data;
            setName(data.name);
            setUsername(data.userName);
            setPhn(data.phone);
            setAddress(data.address);
            setGender(data.gender);
            // setFeaturedImg(data.profilePic);


        })
    }

    async function handleSubmit(event){
        event.preventDefault();
        if (!name) {
            swal({
                text: "Name required",
                icon: "error"
            })
            return;
        }
        else if (!userName) {
            swal({
                text: "User Name required",
                icon: "error"
            })
            return;
        }

        else if (!phone) {
            swal({
                text: "Phone Number required",
                icon: "error"
            })
            return;
        }

        else{

            let formData = new FormData();
            formData.append("name", name);
            formData.append("userName", userName);
            formData.append("phone", phone);
            formData.append("gender", gender);
            formData.append("address", address);
            formData.append("image", featuredImg ? featuredImg : userData.profilePic);

            



            await axios({
                method: "PUT",
                url: url + "user/profile",
                data : formData,

                headers: {
                    "Authorization": "Bearer " + token,
                }
    
            }).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    swal({
                        text: response.data.msg,
                        icon: "success"
                    })

                    getUser();

                    setShowForm(false);
                    setFeaturedImg("");
                    setPreviewImg("");
                    
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    return (
        <div>
            <div className="card" style={{ width: '30rem', margin: 'auto' }}
            >
                {previewImg ?
                    <img src={previewImg} className="card-img-top" height={240} width={100} />
                    :
                    (userData && userData.profilePic) ?
                        <img src={imageUrl + "user/" + userData.profilePic} className="card-img-top" height={240} width={100} /> :
                        <img src="/assets/images/default.jpg" className="card-img-top" height={240} width={100} />
                }
                <i class="fa-solid fa-pen-to-square edit-btn" style={{ cursor: 'pointer' }} onClick={() => {
                    setShowForm(!showForm)
                }}></i>
                {(showForm == true) ?
                    <label for="p_image">
                        <i class="fa-solid fa-camera img-btn" for="image" style={{ cursor: 'pointer' }}></i>
                    </label> :
                    ""
                }

                <div className="card-body">
                    <div class="row g-3 align-items-center">
                        {(showForm == false) ?
                            <div>
                                <p><span><strong>Full Name:</strong>&ensp; {userData.name ? userData.name : 'N/A'}</span></p>
                                <p><span><strong>User Name:</strong>&ensp; {userData.userName ? userData.userName : 'N/A'}</span></p>
                                <p><span><strong>Email:</strong>&ensp; {userData.email ? userData.email : 'N/A'}</span></p>
                                <p><span><strong>Phone:</strong>&ensp; {userData.phone ? userData.phone : 'N/A'}</span></p>
                                <p><span><strong>Address:</strong>&ensp; {userData.address ? userData.address : 'N/A'}</span></p>
                                <p><span><strong>Gender:</strong>&ensp; {userData.gender ? userData.gender : 'N/A'}</span></p>
                            </div> :

                            <div>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="exampleFormControlInput1" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">User Name</label>
                                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="User Name" value={userName} onChange={(e) => setUsername(e.target.value)} />
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Phone</label>
                                        <input type="tel" class="form-control" id="exampleFormControlInput1" placeholder="Phone" value={phone} onChange={(e) => setPhn(e.target.value)} />
                                    </div>



                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Gender</label>
                                        <select class="form-select" aria-label="Default select example" value={gender} onChange={(e) => { setGender(e.target.value) }}>
                                            <option selected>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Address</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <input type="file" class="form-control" id='p_image' hidden defaultValue={featuredImg} onChange={(e) => {
                                            setFeaturedImg(e.target.files[0])
                                            setPreviewImg(URL.createObjectURL(e.target.files[0]));

                                        }} />
                                    </div>
                                    <button type='submit' className='btn btn-primary'>Update</button>
                                </form>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
