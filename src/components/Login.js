import React, { useState } from "react";
import {
  useNavigate
} from "react-router-dom";
function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "Admin" && password === "Admin") {
      setIsAuthenticated(true);
      navigate('/search');
    } else {
      setError("Username or Password is Wrong");
    }
    setUserName("");
    setPassword("");
  }

  return (
    <>
    <header className="header">Welcome</header>
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          {error ? error : null}
        </div>
        <div className="form-group">
          <label htmlFor="user" className="form-label" />
          UserName
          <input
            id="user"
            type="text"
            className="form-control"
            value={userName}
            name="user"
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label"/>
          Password
          <br></br>
          <input
            id="password"
            name="password"
            className="form-control"
            value={password}
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary active-btn">Submit</button>
        </div>
      </form>
      
    </div>
    </>
  );
}

export default Login;
