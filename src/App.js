import React from "react";
import Menu from "./components/Menu/View/Menu";
import "./App.css";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import Categories from "./pages/CategoriesPage/View/Categories";
import Messages from "./pages/MessagesPage/View/Messages";
import Footer from "./components/Footer/View/Footer";
import KullanımSartlari from "./components/BiMateryal/KullanımSartlari.jsx";
import HomePage from "./pages/HomePage/View/HomePage";
import MaterialDetails from "./pages/MaterialDetailsPage/View/MaterialDetails";
import SignInPage from "./pages/SignInPage/View/SignIn";
import { user } from './pages/SignInPage/signInSlice';
import { useSelector } from "react-redux";

function App() {
  const userValue = useSelector(user);

  return (
    <div className="App">
      {!userValue ? (
        <SignInPage />
      ) : (
        <>
          <Menu />
          <Container className="main">
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/home" component={HomePage}></Route>
              <Route exact path="/messages" component={Messages}></Route>
              <Route exact path="/categories" component={Categories}></Route>
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
          </Container>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
