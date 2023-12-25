import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    const validUsername = "user123";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
      localStorage.setItem("authToken", "yourAuthToken");
      history.push("/products");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div style={styles.loginBox}>
      <div style={styles.illustrationWrapper}>
        <img
          style={styles.illustrationImage}
          src="https://cdn.pixabay.com/photo/2023/08/08/17/57/ai-generated-8177911_1280.jpg"
          alt="Login"
        />
      </div>
      <div style={styles.loginForm}>
        <h2 style={styles.header}>Login</h2>
        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="username">
            Username:
          </label>
          <input
            style={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>
        </div>
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
    marginTop: '100px'
  },
  loginForm: {
    flex: "1 0 100%",
    maxWidth: "480px",
    width: "100%",
    padding: "60px",
    marginBottom: '80px'
  },
  illustrationWrapper: {
    display: "flex",
    alignItems: "flex-end",
    maxWidth: "800px",
    minHeight: "10%",
  },
  illustrationImage: {
    display: "block",
    width: "100%",
    height: '100%',
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