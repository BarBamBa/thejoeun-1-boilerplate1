import React, { useState, useRef, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUpForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const emailHandler = (e) => {
        setEmail(e.target.value);
        console.log(email);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }
    const nicknameHandler = (e) => {
        setNickname(e.target.value);
        console.log(nickname);
    }


    const submitFinished = (e) => {        
        e.preventDefault();
       fetch("/api/auth/signup", {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                nickname: nickname
            })
        }).then(data => {
            console.log(data);
            alert('가입완료');
            navigate('/login');
         });

    }

    return (
        <section className="d-flex vh-100">
            <div className="container-fluid row justify-content-center align-content-center">
                <div className="card bg-dark" style={{borderRadius: '1rem'}}>
                    <div className="card-body p-5 text-center">
                        <h2 className="text-white">SIGN UP</h2>
                        <p className="text-white-50 mt-2 mb-5">서비스 사용을 위한 회원 가입</p>

                        <div className="mb-2">
                            <form onSubmit={submitFinished}>
                                <input type="hidden" />
                                <div className="mb-3">
                                    <label className="form-label text-white">Email address</label>
                                    <input type="email" className="form-control" name="email" value={email} onChange={emailHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-white">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={passwordHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-white">Nickname</label>
                                    <input type="text" className="form-control" name="nickname" value={nickname} onChange={nicknameHandler} />
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUpForm