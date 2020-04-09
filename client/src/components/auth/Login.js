import React, { Fragment, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types';
const Login = ({ setAlert, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const { email, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  }
}
if (isAuthenticated) {
  return <Redirect to="/dashboard" />;
}
return (
  <Fragment>
    <h1 className="large text-primary">Sign Up</h1>
    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
    <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>

      <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
        <small className="form-text"
        >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password} onChange={e => onChange(e)}
        />
      </div>

      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
    <p className="my-1">
      Already have an account? <Link to="/login">Sign In</Link>
    </p>
  </Fragment>
)

  ;


Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login)