import React, { useEffect } from "react";
import Menu from "./components/Menu/View/Menu";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Categories from "./pages/CategoriesPage/View/Categories";
import Messages from "./pages/MessagesPage/View/Messages";
import Footer from "./components/Footer/View/Footer";
import KullanımSartlari from "./components/BiMateryal/KullanımSartlari.jsx";
import ProductDetails from "./pages/ProductDetail/View/ProductDetails";
import HomePage from "./pages/HomePage/View/HomePage";
import MaterialDetails from "./pages/MaterialDetailsPage/View/MaterialDetails";
import SignInPage from "./pages/SignInPage/View/SignIn";
import { setUser, user } from "./pages/SignInPage/signInSlice";
import { useDispatch, useSelector } from "react-redux";
import AddMaterial from "./pages/AddMaterial/View/AddMaterial";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryMaterialsPage from "./pages/CategoryMaterialsPage/View/CategoryMaterialsPage";
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
    <div className="App">
      {!userValue ? (
        <SignInPage />
      ) : (
        <>
          <Menu />
          <ToastContainer />
          <div className="main">
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/home" component={HomePage}></Route>
              <Route exact path="/messages" component={Messages}></Route>
              <Route exact path="/categories" component={Categories}></Route>
              <Route exact path="/addMaterial" component={AddMaterial}></Route>
              <Route
                path="/categoryMaterials"
                component={CategoryMaterialsPage}
              ></Route>
              <Route
                exact
                path="/bizimtakim"
                component={ProductDetails}
              ></Route>
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
