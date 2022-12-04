import React from "react";
import Menu from "./components/Menu/View/Menu";
import "./App.css";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import Categories from "./pages/CategoriesPage/View/Categories";
import Messages from "./pages/MessagesPage/View/Messages";
import Home from "./pages/HomePage/View/HomePage";
import Footer from "./components/Footer/View/Footer";
import KullanımSartlari from "./components/BiMateryal/KullanımSartlari.jsx";

function App() {
  return (
    <div className="App">
      <Menu />

      <Container className="main">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/messages" component={Messages}></Route>
          <Route exact path="/categories" component={Categories}></Route> 
          <Route exact path="/kullanimsartları" component={KullanımSartlari}></Route> 

        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
