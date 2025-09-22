import { useState } from "react";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";
import useAuth from "@/stores/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuth((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ username: "fakeUser", password: password });
    navigate("/");
  };

  return (
    <PageContainer>
      <PageIntro
        header="Login"
        description="Sign in to see some really cool stuff!"
      />
      <div>
        <label htmlFor="username-input">Login</label>
        <input
          id="username-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password-input">Password</label>
        <input
          id="password-input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!username && !password} onClick={handleLogin}>
          Login
        </button>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
