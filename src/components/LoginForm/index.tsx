import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state: any) => state.auth.user);

  console.log("user: ", user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  return (
    <div>
      <h1>Login Form</h1>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
