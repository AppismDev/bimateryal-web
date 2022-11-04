import React from "react";
import Menu from "./components/Menu";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { Switch, Route, Router } from "react-router-dom";
import Categories from "./pages/Categories";
import Messages from "./pages/Messages";
import Home from "./pages/HomePage";


function App() {
  return (
    
      <div className="App">
        <Menu></Menu>
       
        <Container className="main">
      
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/messages" component={Messages}></Route>
            <Route exact path="/categories" component={Categories}></Route>
          </Switch>
        </Container>
      </div>
     
  );
}

export default App;
