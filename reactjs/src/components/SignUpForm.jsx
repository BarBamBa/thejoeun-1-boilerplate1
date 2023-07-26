import React, { useState, useRef, useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUpForm() {
    return (
        <section class="d-flex vh-100">
            <div class="container-fluid row justify-content-center align-content-center">
                <div class="card bg-dark" style={{borderRadius: '1rem'}}>
                    <div class="card-body p-5 text-center">
                        <h2 class="text-white">SIGN UP</h2>
                        <p class="text-white-50 mt-2 mb-5">서비스 사용을 위한 회원 가입</p>

                        <div class="mb-2">
                            <form  method="POST">
                                <input type="hidden" />
                                <div class="mb-3">
                                    <label class="form-label text-white">Email address</label>
                                    <input type="email" class="form-control" name="email" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-white">Password</label>
                                    <input type="password" class="form-control" name="password" />
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUpForm