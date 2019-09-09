import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../actions/alerts";
axios.defaults.baseURL = "http://localhost:5000";

const Register = props => {
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    password: "",
    password2: ""
  });
  const { Firstname, Lastname, email, password, password2 } = formData;
  const onChange = e => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert("Passwords must be the same", "danger");
    } else {
      const newUser = {
        Lastname: Lastname,
        Firstname: Firstname,
        email: email,
        password: password,
        password2: password2
      };
      try {
        const res = await axios.post("api/users/", newUser, {
          ContentType: "application/json"
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              onChange={e => onChange(e)}
              placeholder="First Name"
              name="Firstname"
              value={Firstname}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Lastname"
              name="Lastname"
              value={Lastname}
              required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              minLength="6"
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="Login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default connect(
  null,
  { setAlert }
)(Register);
