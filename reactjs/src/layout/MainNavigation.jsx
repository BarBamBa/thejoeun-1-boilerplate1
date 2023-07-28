import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";

function MainNavigation () {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [nickName, setNickName] = useState('');

  let isLogin = false;
  const cookieToken = cookies.token;
  if (cookieToken) {
    isLogin = true;
  }

  useEffect(() => {
    
    if(isLogin) {
      const accessToken = 'Bearer ' + cookieToken;

      fetch('/api/member/me', {
        method: 'GET',
        headers: {
          "Content-Type": 'appliation/json',
          "Authorization": accessToken,
        },
      }).then(res => {
        if (res.ok) {          
          return res.json();

        } else {
          alert('회원정보를 가져오는데 실패하였습니다.');
        }

        
      }).then(data => {
        console.log('member/me ', data);
        if (data)
          setNickName(data.nickname);
      });
    }
  }, [isLogin])

  const toggleLogoutHandler = () => {
    removeCookie('token');

    alert('로그아웃 하였습니다.');
    navigate('/', true);
  }

  return (
    <header>
      <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
        <div className="container-fluid">
          <Link to='/' className='navbar-brand'>LOGO</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='collapse navbar-collapse justify-content-between' id='navbarSupportedContent'>
            <ul className='navbar-nav'>
              <li className='nav-item'><Link to='/' className='nav-link'>Home</Link></li>
              <li className='nav-item'><Link to='/about' className='nav-link'>About</Link></li>
            </ul>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                {!isLogin ? <Link to='/login' className='nav-link'>Login</Link> : <Link to='/profile' className='nav-link'>{nickName}님 반갑습니다~</Link>}
              </li>
              <li className='nav-item'>
                {!isLogin ? <Link to='/signup' className='nav-link'>SignUp</Link> : <button onClick={toggleLogoutHandler} className='nav-link'>Logout</button>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;