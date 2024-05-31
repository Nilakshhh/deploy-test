import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigateTo = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a cookie with the username is present
    const usernameCookie = document.cookie.split(";").find((cookie) => {
      return cookie.trim().startsWith("tresses_username=");
    });

    if (usernameCookie) {
      navigateTo("/admin");
    }
    setLoading(false);
  }, [navigateTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var url = apiUrl + "/admins/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        document.cookie = `tresses_username=${username}`;
        navigateTo("/admin");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <label>Password:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="toggle-password"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
