import React from "react";
import {BiHomeAlt, BiMessage, BiCategory} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import {FiBell, FiSettings} from 'react-icons/fi'
import {CiSearch} from 'react-icons/ci'

export default function menu() {
  return (
    <div>
<div className="menu">
      <div className="menu-left">
        <a href="/" className="icon-container">
          <BiHomeAlt size={26}/>
          <div className="icon-text">Ana Sayfa</div>
        </a>

        <a href="messages" className="icon-container">
          <BiMessage size={26}/>
          <div className="icon-text">Mesajlarım</div>
        </a>

        <div className="icon-container">
          <BiCategory  size={26}/>
          <div className="icon-text">Kategoriler</div>
        </div>

      </div>
      <div className="menu-right">
        <div className="menu-input-container">
            <CiSearch size={26} className="menu-input-icon"/>
            <input className="menu-input" type="text" placeholder="Kitap, Kalem, Defter..."/>
        </div>
        <div className="menu-right-icon-row">
          <CgProfile size={26}/>
          <FiBell size={26}/>
         <FiSettings size={26}/>
        </div>
      </div>
    </div>
    {/* make a divider */}
    <div className="menu-divider"></div>
    
    </div>
    
  );
}
