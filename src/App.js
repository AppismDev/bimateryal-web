import React, { useEffect } from "react";
import "./App.css";
import SignInPage from "./pages/SignInPage/View/SignIn";
import { setUser, user } from "./pages/SignInPage/signInSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import HomeRoot from "./pages/HomeRoot/View/HomeRoot";
function App() {
  const userValue = useSelector(user);
  const dispatch = useDispatch();
  useEffect(() => {
    // localStorage.removeItem("user");
    var userValue = localStorage.getItem("user");
    if (userValue) {
      dispatch(setUser(JSON.parse(userValue)));
    }
  }, []);

  return (
    <div className="App">{!userValue ? <SignInPage /> : <HomeRoot />}</div>
  );
}

export default App;
