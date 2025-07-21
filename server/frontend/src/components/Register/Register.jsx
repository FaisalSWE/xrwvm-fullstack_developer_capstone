import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const validateForm = () => {
    if (!userName || !password || !firstName || !lastName || !email) {
      setErrorMsg("Please fill in all fields.");
      return false;
    }
    if (!email.includes("@")) {
      setErrorMsg("Invalid email address.");
      return false;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const register = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateForm()) return;

    setLoading(true);

    const register_url = window.location.origin + "/djangoapp/register";

    try {
      const res = await fetch(register_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          password,
          firstName,
          lastName,
          email,
        }),
      });

      const json = await res.json();

      if (json.userName) {
        sessionStorage.setItem("username", json.userName);
        window.location.href = "/";
      } else if (json.error === "User already exists") {
        setErrorMsg("The username is already taken.");
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register_container" style={{ width: "50%" }}>
      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span className="text" style={{ flexGrow: "1" }}>
          Sign Up
        </span>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            gohome();
          }}
        >
          <img style={{ width: "1cm" }} src={close_icon} alt="X" />
        </a>
      </div>
      <hr />

      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} className="img_icon" alt="Username" />
            <input
              type="text"
              placeholder="Username"
              className="input_field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={user_icon} className="img_icon" alt="First Name" />
            <input
              type="text"
              placeholder="First Name"
              className="input_field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={user_icon} className="img_icon" alt="Last Name" />
            <input
              type="text"
              placeholder="Last Name"
              className="input_field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={email_icon} className="img_icon" alt="Email" />
            <input
              type="email"
              placeholder="Email"
              className="input_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={password_icon} className="img_icon" alt="Password" />
            <input
              type="password"
              placeholder="Password"
              className="input_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {errorMsg && <p style={{ color: "red", marginTop: 10 }}>{errorMsg}</p>}

        <div className="submit_panel">
          <input
            className="submit"
            type="submit"
            value={loading ? "Registering..." : "Register"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
