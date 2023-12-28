import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib";
import loginStyles from "../../styles";
import { useDispatch } from "react-redux";
import { loginReducer } from "../../Store/Auth";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
     const resp = await signInWithEmailAndPassword(auth, email, password);
     if(!!resp.user){
       dispatch(loginReducer(resp.user))
       history.push("/products");
     }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div style={loginStyles.loginBox}>
      <div style={loginStyles.loginForm}>
        <h2 style={loginStyles.header}>Login</h2>
        <div style={loginStyles.inputContainer}>
          <label style={loginStyles.label} htmlFor="email">
            Email:
          </label>
          <input
            style={loginStyles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={loginStyles.inputContainer}>
          <label style={loginStyles.label} htmlFor="password">
            Password:
          </label>
          <input
            style={loginStyles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={loginStyles.error}>{error}</p>}
        <div style={loginStyles.buttonContainer}>
          <button style={loginStyles.button} onClick={handleLogin}>
            Login
          </button>
          <a href='/signup'>Don't have an account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
