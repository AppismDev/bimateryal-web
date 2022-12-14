import React from "react";

import { BsGithub, BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function Footer() {
  return (
    <div class="footer-flex-container">
      <div class="div-class">
        <div class="column-1">
          <div class="i">
            <div>
              <img
                class="contentimg"
                src="https://avatars.githubusercontent.com/u/95625965?s=200&v=4"
              ></img>
            </div>
          </div>
        </div>

        <div class="column-2">
          <h3>BiMateryal</h3>
          <ul>
            <li>
              <Link to="kullanimsartları">Kullanım Şartları</Link>
            </li>
            <li>
              <a>Gizlilik Politikası</a>
            </li>
            <li>
              <a>Site Haritası</a>
            </li>
          </ul>
        </div>
        <div class="column-3">
          <h3>Company</h3>
          <ul>
            <li>
              <Link to="hakkımızda">About Us</Link>
            </li>
            <li>
              <Link to="bizimtakim">Our Team</Link>
            </li>
            <li>
              <a>Our Partners</a>
            </li>
            <li>
              <a>Our Blog</a>
            </li>
          </ul>
        </div>

        <div class="column-4">
          <h3>Bizi Takip Edin</h3>

          <ul>
            <li>
              <Link
                to={{ pathname: "https://github.com/AppismDev" }}
                target={"_blank"}
              >
                <BsGithub class="ft-logo" color="rgb(174, 205, 208)" />
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "https://github.com/AppismDev" }}
                target={"_blank"}
              >
                <BsTwitter class="ft-logo" color="rgb(49, 157, 203)" />
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "https://github.com/AppismDev" }}
                target={"_blank"}
              >
                <BsLinkedin class="ft-logo" color="#0072b1" />
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "https://github.com/AppismDev" }}
                target={"_blank"}
              >
                <BsInstagram class="ft-logo" color="rgba(245, 98, 13)" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div class="under-column">
        <hr />
        <p>
          Copyright © 2022 BiMateryal. All Rights Reserved. Created by Appism
        </p>
      </div>
    </div>
  );
}
