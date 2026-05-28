import axios from "axios";
import { useState } from "react";

function Login({ setIsLoggedIn }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {

    axios.post("http://127.0.0.1:8000/login/", {
      username: username.trim(),
      password: password.trim()
    })

    .then((response) => {

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      setIsLoggedIn(true);

    })

    .catch((error) => {

      console.log(error.response?.data);
      alert("Invalid credentials");

    });

  };

  return (
    <div>
      <h1>Login 🔐</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;