import React, { useEffect } from "react";
import Menu from "../../../components/Menu/View/Menu";

import { Switch, Route } from "react-router-dom";
import Categories from "../../CategoriesPage/View/Categories";
import Messages from "../../MessagesPage/View/Messages";
import Footer from "../../../components/Footer/View/Footer";
import HomePage from "../../HomePage/View/HomePage";
import AddMaterial from "../../AddMaterial/View/AddMaterial";
import { toast, ToastContainer } from "react-toastify";

import CategoryMaterialsPage from "../../CategoryMaterialsPage/View/CategoryMaterialsPage";
import MaterialDetails from "../../MaterialDetailsPage/View/MaterialDetailsPage";
import ProfilePage from "../../ProfilePage/View/ProfilePage";
import KullanımSartlari from "../../../components/BiMateryal/KullanımSartlari";
import { listenUserNotifications } from "../../HomePage/homePageAPI";
import { user } from "../../SignInPage/signInSlice";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../NotificationsPage/notificationsSlice";
import DialogContainer from "../../../components/DialogContainer/View/DialogContainer";
import NewMaterials from "../../NewMaterials/View/NewMaterials";
export default function HomeRoot() {
  const selectUser = useSelector(user);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Home";
    listenUserNotifications(
      selectUser.uid,
      (notification, initState, isUpdate, isDelete, isAdd) => {
        dispatch(setNotifications(notification));
        if (!initState && isAdd) {
          toast.info("New Notification");
        }
      }
    );
    // function getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         toast.success("location : " + position.coords.latitude);
    //       },
    //       (err) => {
    //         console.log(err);
    //         toast.error("error location : " + err.message);
    //       }
    //     );
    //   }
    // }

    // getLocation();
  }, []);
  return (
    <div className="App">
      <Menu />
      <ToastContainer />
      <DialogContainer />
      <div className="main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/addMaterial" component={AddMaterial} />
          <Route path="/categoryMaterials" component={CategoryMaterialsPage} />
          <Route
            exact
            path="/material/details/:id"
            component={MaterialDetails}
          />
          <Route exact path="/users/profile/:id" component={ProfilePage} />
          <Route exact path="/kullanimsartları" component={KullanımSartlari} />
          <Route exact path="/newMaterials" component={NewMaterials} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
