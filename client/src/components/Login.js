import React from "react";
import { axiosWithAuth } from "../api/axiosWithAuth";
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom'


class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((res) => {
        console.log('login: res: ', res);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/bubble_page");
      })
      .catch((err) => {
        if (err.response) {
          console.error(
            "Login.js: login failed: response from server: ",
            err.response.data
          );
        } else {
          console.error("Login.js: login failed: err: ", err);
        }
      });
  };

  render() {
    return (
      <div>
        <Form className='login' onSubmit={this.login}>

          <FormGroup>
            <input
              type="text"
              name="username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="password"
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button>Log in</Button>
        </Form>
      </div>



    );
  }
}

export default Login;

