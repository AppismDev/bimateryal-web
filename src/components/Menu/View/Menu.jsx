import React from "react";
import { BiHomeAlt, BiMessage, BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiBell, FiSettings } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function menu() {
  return (
    <div>
      <div className="menu">
        <div className="menu-left">
          <Link to="/" className="icon-container">
            <BiHomeAlt size={24} />
            <div className="icon-text">Ana Sayfa</div>
          </Link>

          <Link to="messages" className="icon-container">
            <BiMessage size={24} />
            <div className="icon-text">Mesajlarım</div>
          </Link>

          <Link to="messages" className="icon-container">
            <BiCategory size={24} />
            <div className="icon-text">Kategoriler</div>
          </Link>
        </div>
        <div className="menu-right">
          <div className="menu-input-container">
            <CiSearch size={24} className="menu-input-icon" />
            <input
              className="menu-input"
              type="text"
              placeholder="Kitap, Kalem, Defter..."
            />
          </div>
          <div className="menu-right-icon-row">
            <Link to="/">
              <CgProfile size={24} />
            </Link>
            <Link to="/">
              <FiBell size={24} />
            </Link>
            <Link to="/">
              <FiSettings size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className="menu-divider" />
    </div>
  );
}
