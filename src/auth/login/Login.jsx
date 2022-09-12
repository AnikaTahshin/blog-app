import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Login.css'
import swal from 'sweetalert';
import axios from 'axios';
import { DataContext } from '../../DataProvider';

export default function Login() {
    let { url, token, setToken, userInfo, setUserInfo, setId } = useContext(DataContext);


    let history = useHistory();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [showPass, setShowPass] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!email) {
            swal({
                text: "Please enter email",
                icon: "error",
            })
            return;
        }
        else if (!password) {
            swal({
                text: "Please enter password",
                icon: "error",
            })
            return;
        }
        else {

            let data = {
                email: email,
                password: password
            }
            await axios({
                method: "POST",
                url: url + "auth/signin",
                data: data

            }).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    swal({
                        text: response.data.msg,
                        icon: "success"
                    })

                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("id", response.data.data._id);

                    setToken (response.data.token);
                    setId(response.data.data._id);
                    

                    history.push("/");
                }
                else {
                    swal({
                        text: "Something went wromg",
                        icon: "error"
                    })

                }



            }).catch((error) => {
                console.log(error)
                swal({
                    text: error.response.data.msg,
                    icon: "error"
                })
            })

        }
    }

    // async function handleSubmit(event) {
    //     event.preventDefault();

    //     if (!email) {
    //         swal({
    //             text: "Please enter email.",
    //             icon: "error",
    //         });
    //         return;
    //     }
    //     else if (!password) {
    //         swal({
    //             text: "Please enter password.",
    //             icon: "error",
    //         });
    //         return;
    //     }

    //     else {
    //         let data = {
    //             email: email,
    //             password: password,
    //         }

    //         await axios({
    //             method: "POST",
    //             url: "http://localhost:3001/api/auth/signin",
    //             data: data
    //         }).then((response) => {

    //             console.log(response);
    //             if (response.status == 200) {


    //                 let res = response.data.data;
    //                 localStorage.setItem("token", response.data.token);
    //                 localStorage.setItem("email", res.email);
    //                 localStorage.setItem("userName", res.userName);
    //                 localStorage.setItem("phone", res.phone);

    //                 swal({
    //                     text: response.data.msg,
    //                     icon: "success",
    //                 });

    //             }

    //             else{
    //                 swal({
    //                     text: "Something went wrong",
    //                     icon: "error",
    //                 });
    //             }

    //         }).catch((error) => {
    //             swal({
    //                 text: error.response.data.msg,
    //                 icon: "error",
    //             });
    //         })
    //     }
    // }

    return (
        <div>
            <div class=" flex-r container" >
                <div class="flex-r login-wrapper" style={{
                    top: "-62px",
                    position: "relative"
                }}>
                    <div class="login-text">
                        <div class="logo">
                            <span><i class="fab fa-speakap"></i></span>
                            <span>Bloggers</span>
                        </div>
                        <h1>Sign In</h1>
                        <p>It's not long before you embark on this journey! </p>

                        <form class="flex-c" onSubmit={(e) => { handleSubmit(e) }}>
                            <div class="input-box">
                                <span class="label">E-mail</span>
                                <div class=" flex-r input">
                                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="name@abc.com" />
                                    <i class="fas fa-at"></i>
                                </div>
                            </div>

                            <div class="input-box">
                                <span class="label">Password</span>
                                <div class="flex-r input">
                                    <input type={showPass ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="8+ (a, A, 1, #)" />
                                    <i class="fas fa-lock" onClick={() => { setShowPass(!showPass) }}></i>
                                </div>
                            </div>

                            <input class="btn" type="submit" value="Sign In" />
                            <span class="extra-line">
                                <span>Does not have an account?</span>&ensp;
                                <Link to="/signup">Sign Up</Link>
                            </span>
                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
}
