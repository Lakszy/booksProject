import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib";
import loginStyles from "../../styles";

const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      // Check if the email is already in use
      const existingUser = await signInWithEmailAndPassword(auth, email, password);
      if (existingUser) {
        setError("Email is already in use. Please use a different email or log in.");
        return;
      }

      // If the email is not in use, proceed with creating a new user
      await createUserWithEmailAndPassword(auth, email, password);
      history.push("/products");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Error creating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginStyles.loginBox}>
      <div style={loginStyles.loginForm}>
        <h2 style={loginStyles.header}>Sign Up</h2>
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
        <div style={loginStyles.inputContainer}>
          <label style={loginStyles.label} htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            style={loginStyles.input}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p style={loginStyles.error}>{error}</p>}
        <div style={loginStyles.buttonContainer}>
          <button
            style={loginStyles.button}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <a href='/'>Already have an account</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
