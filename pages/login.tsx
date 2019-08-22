import Head from 'next/head'
import React, { Component } from 'react';
import Router from 'next/router';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../static/style/main.scss';

type Props = {
    getUserData: any
}
class LoginPage extends Component<Props> {

    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        if (localStorage.authToken) {
            Router.push('/');
        }
    }

    handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }

    login = async (event) => {
        event.preventDefault();
        const {email,password} = this.state;
        if (!email || !password) return;
        
        try {
            const res = await axios.post(process.env.AUTH_API,{email,password});
            if (res.status === 200) {
                const {access_token,refresh_token,expires_at,first_name,full_name,last_name} = res.data.data;
                const {email,id,name,slug} = res.data.data.shop;
                localStorage.authToken = access_token;
                localStorage.refreshToken = refresh_token;
                localStorage.expriedTime = expires_at;
                const userData = {
                    first_name,
                    full_name,
                    last_name,
                    email,
                    id,
                    shop_name:name,
                    slug
                };

                toast.success('Đăng nhập thành công');

                setTimeout(()=>Router.push('/'),800);
            }
        } catch (error) {
            console.log(error);    
            toast.error('Sai thông tin đăng nhập');        
        }

    }

    render() {
        return(
            <>
                <Head>
                    <title>SELLER CENTER LOGIN</title>
                </Head>
                <div className="login-page">
                    <ToastContainer position="top-center" hideProgressBar={true} autoClose={2000}/> 
                    <div className="login-form mx-auto bg-white rounded shadow">
                        <img className="rounded-circle" src="/static/images/logo.png" alt="TTS Login Page"/>
                        <h1 className="text-center mt-5">ĐĂNG NHẬP SELLER CENTER</h1>
                        <hr className="mb-5"/>
                        <div className="d-flex justify-content-center">
                            <form onSubmit={this.login}>
                                <div className="form-group">
                                    <label htmlFor="email"><b>Email:</b></label>
                                    <input onChange={this.handleChange} id="email" type="email" className="form-control" placeholder="Email" />
                                    <small id="emailHelp" className="form-text text-muted">Email đăng nhập trên thitruongsi.com</small>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"><b>Password:</b></label>
                                    <input onChange={this.handleChange} id="password" type="password" className="form-control" placeholder="Password"/>
                                </div>
                                <button type="submit" className="btn d-block mx-auto mt-5">Login</button>                      
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginPage;