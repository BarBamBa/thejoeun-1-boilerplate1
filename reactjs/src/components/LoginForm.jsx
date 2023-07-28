import React, { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies();

    const emailHandler = (e) => {
        setEmail(e.target.value);
        console.log(email);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }

    const submitFinished = (e) => {  
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        // Perform the login using fetch
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(res => {
            if (res.ok) {
                // console.log(res);
                alert('로그인 성공');
                return res.json();
                
            } else {
                alert('로그인 실패');
            }
        })
        .then(data => {
            if (data) {
                const expireTimeDate = new Date(Number(data.tokenExpiresIn));
                // console.log('expireTime: ', expireTimeDate.toLocaleString());
                setCookie('token', data.accessToken, { expires: expireTimeDate });
        
                navigate('/');
              }
        });        

    }

    return (
        <section className="d-flex vh-100">
            <div className="container-fluid row justify-content-center align-content-center">
                <div className="card bg-dark" style={{ borderRadius: '1rem' }}>
                    <div className="card-body p-5 text-center">
                        <h2 className="text-white">LOGIN</h2>
                        <p className="text-white-50 mt-2 mb-5">서비스를 사용하려면 로그인을 해주세요!</p>
                        <div className="mb-2">
                            <form onSubmit={submitFinished}>
                                <div className="mb-3">
                                    <label className="form-label text-white">Email address</label>
                                    <input type="email" className="form-control" name="username" onChange={emailHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-white">Password</label>
                                    <input type="password" className="form-control" name="password" onChange={passwordHandler} />
                                </div>
                                <button type="submit" className="btn btn-primary">로그인</button>
                            </form>
                            <br />
                            <div>
                                <a href="http://localhost:8090/oauth2/authorization/google">
                                    {/* <img src="/thejoeun-1-boilerplate1/img/google3.png" alt="google" /> */}
                                    <img src={`${process.env.PUBLIC_URL}/img/google3.png`} alt="google" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm