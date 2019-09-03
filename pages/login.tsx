import Head from "next/head";
import React, { Component } from "react";
import Router from "next/router";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "../static/style/main.scss";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  getUserData: any;
};
class LoginPage extends Component<Props> {
  state = {
    email: "",
    password: "",
    loading: false
  };

  componentDidMount() {
    if (localStorage.authToken) {
      Router.push("/");
    }
  }

  handleChange = event => {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  login = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) return;

    try {
      const res = await axios.post(process.env.AUTH_API, { email, password });

      if (res.status === 200) {
        const { access_token, refresh_token, expires_at } = res.data.data;
        localStorage.authToken = access_token;
        localStorage.refreshToken = refresh_token;
        localStorage.expiredTime = expires_at;
        toast.success("Đăng nhập thành công");
        setTimeout(() => Router.push("/"), 800);
      }
    } catch (error) {
      console.log(error);
      toast.error("Sai thông tin đăng nhập");
    }
  };

  spinnerLoading = (
    <div className="spinner-border text-warning" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  renderLoginText = this.state.loading ? this.spinnerLoading : "Login";

  render() {
    return (
      <>
        <Head>
          <title>SELLER CENTER LOGIN</title>
        </Head>
        <div className="login-page">
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            autoClose={5000}
          />
          <div className="login-form mx-auto bg-white rounded shadow">
            <img
              className="rounded-circle"
              src="/static/images/logo.png"
              alt="TTS Login Page"
            />
            <h1 className="text-center mt-5">ĐĂNG NHẬP SELLER CENTER</h1>
            <hr className="mb-5" />
            <div className="d-flex justify-content-center">
              <form onSubmit={this.login}>
                <div className="form-group">
                  <label htmlFor="email">
                    <b>Email:</b>
                  </label>
                  <input
                    onChange={this.handleChange}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Email đăng nhập trên thitruongsi.com
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <b>Password:</b>
                  </label>
                  <input
                    onChange={this.handleChange}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn d-block mx-auto mt-5">
                  {this.renderLoginText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginPage;
