import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../lib";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleAuthAction = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      if (isSignup) {
        await auth.createUserWithEmailAndPassword(email, password);
        history.push("/login");
      } else {
        await auth.signInWithEmailAndPassword(email, password);
        localStorage.setItem("authToken", "yourAuthToken");
        history.push("/products");
      }
    } catch (error) {
      setError(
        isSignup ? "Error creating user: " : "Invalid email or password."
      );
    }
  };
  return (
    <div style={styles.loginBox}>
      <div style={styles.loginForm}>
        <h2 style={styles.header}>{isSignup ? "Sign Up" : "Login"}</h2>
        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleAuthAction}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>
        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  loginBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row-reverse",
    maxWidth: "1000px",
    overflow: "hidden",
    margin: "0 auto",
    borderRadius: "12px",
    marginTop: "100px",
  },
  loginForm: {
    flex: "1 0 100%",
    maxWidth: "480px",
    width: "100%",
    padding: "60px",
    marginBottom: "80px",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    marginRight: "10px",
    fontSize: "16px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "15px",
    border: "1px solid #555",
    borderRadius: "5px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  buttonContainer: {},
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
  },
};

export default Login;
