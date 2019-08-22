import Head from 'next/head'
import React, { Component } from 'react'
import '../static/style/main.scss';

class LoginPage extends Component {
    render() {
        return(
            <>
                <Head>
                    <title>SELLER CENTER LOGIN</title>
                </Head>
                <div className="login-page">
                    <div className="login-form mx-auto bg-white rounded shadow">
                        <img className="rounded-circle" src="/static/images/logo.png" alt="TTS Login Page"/>
                        <h1 className="text-center mt-5">ĐĂNG NHẬP SELLER CENTER</h1>
                        <hr className="mb-5"/>
                        <div className="d-flex justify-content-center">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email"><b>Email:</b></label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" />
                                    <small id="emailHelp" className="form-text text-muted">Email đăng nhập trên thitruongsi.com</small>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"><b>Password:</b></label>
                                    <input id="password" type="password" className="form-control" placeholder="Password"/>
                                </div>
                                <button className="btn d-block mx-auto mt-5">Login</button>                      
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}



export default LoginPage;