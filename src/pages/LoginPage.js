import { useContext } from "react";

import Login from "../Login";

import { AuthContext } from "../context/AuthContext";

function LoginPage() {

  const {

    setIsLoggedIn

  } = useContext(AuthContext);

  return (

    <Login setIsLoggedIn={setIsLoggedIn} />

  );

}

export default LoginPage;
