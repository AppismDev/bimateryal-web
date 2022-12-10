import React, { useEffect } from "react";
import Menu from "./components/Menu/View/Menu";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Categories from "./pages/CategoriesPage/View/Categories";
import Messages from "./pages/MessagesPage/View/Messages";
import Footer from "./components/Footer/View/Footer";
import KullanımSartlari from "./components/BiMateryal/KullanımSartlari.jsx";
import HomePage from "./pages/HomePage/View/HomePage";
import MaterialDetails from "./pages/MaterialDetailsPage/View/MaterialDetails";
import SignInPage from "./pages/SignInPage/View/SignIn";
import { setUser, user } from "./pages/SignInPage/signInSlice";
import { useDispatch, useSelector } from "react-redux";
import AddMaterial from "./pages/AddMaterial/View/AddMaterial";

function App() {
  const userValue = useSelector(user);
  const dispatch = useDispatch();
  useEffect(() => {
    var userValue = localStorage.getItem("user");
    if (userValue) {
      dispatch(setUser(JSON.parse(userValue)));
    }
  }, []);

  return (
    <div className="App">
      {!userValue ? (
        <SignInPage />
      ) : (
        <>
          <Menu />
          <div className="main">
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/home" component={HomePage}></Route>
              <Route exact path="/messages" component={Messages}></Route>
              <Route exact path="/categories" component={Categories}></Route>
              <Route exact path="/addMaterial" component={AddMaterial}></Route>
              <Route
                exact
                path="/product/details"
                component={MaterialDetails}
              ></Route>
              <Route
                exact
                path="/kullanimsartları"
                component={KullanımSartlari}
              ></Route>
            </Switch>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
