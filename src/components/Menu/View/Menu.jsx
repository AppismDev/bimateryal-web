import React from "react";
import { BiHomeAlt, BiMessage, BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiBell, FiSettings } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../../pages/SignInPage/signInSlice";
import SearchBar from "../../SearchBar/View/SearchBar";
import Notification from "../../Notification/View/Notification";

export default function Menu() {
  const userState = useSelector(user);
  const history = useHistory();
  return (
    <div>
      <div className="menu">
        <div className="menu-left">
          <Link to="/" className="icon-container">
            <BiHomeAlt size={24} />
            <div className="icon-text">Ana Sayfa</div>
          </Link>

          <Link to="/messages" className="icon-container">
            <BiMessage size={24} />
            <div className="icon-text">Mesajlarım</div>
          </Link>

          <Link to="/categories" className="icon-container">
            <BiCategory size={24} />
            <div className="icon-text">Kategoriler</div>
          </Link>
        </div>
        <div className="menu-right">
          <SearchBar />
          <div className="menu-right-icon-row">
            <Link
              to={{
                pathname: `/users/profile/${userState.uid}`,
              }}
            >
              <CgProfile size={24} />
            </Link>
            <Link to="/">
              {/* <FiBell size={24} /> */}
              <Notification />
            </Link>
            {/* <Link to="/">
              <FiSettings size={24} />
            </Link> */}
          </div>
          <button
            className="menu-add-button"
            onClick={(e) => {
              e.preventDefault();
              history.push("/addMaterial");
            }}
          >
            Ekle
          </button>
        </div>
      </div>
      <div className="menu-divider" />
    </div>
  );
}
