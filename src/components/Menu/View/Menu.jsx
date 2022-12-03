import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt, BiMessage } from "react-icons/bi";
import Notifications from "./../../Notification/Views/Notifications";
import SettingsDropdown from "./../../Setting/View/Settings";
import Settings from "./../../Setting/View/Settings";
import User from './../../User/View/User';
import {
  Menu,
  Dropdown,
  Button,
  Image,
  Input,
  MenuItem,
  Container,
} from "semantic-ui-react";


export default function menu() {
  return (
    <div>
      <Menu secondary>
        <Container>
          <Menu.Item as="a" header style={{ marginRight: "8em" }}>
            <Image
              size="mini"
              src="/kitap.png"
              style={{ marginRight: "1.5em" }}
            />
            BiMateryal
          </Menu.Item>

          <Menu.Item as={NavLink} to="/home" >
            <AiOutlineHome style={{ marginRight: "0.5em" }} size="1.5em" />
            Ana Sayfa
          </Menu.Item>

          <Menu.Item as={NavLink} to="/messages">
            <BiMessage style={{ marginRight: "0.5em" }} size="1.5em" />
            Mesajlar
          </Menu.Item>

          <Menu.Item as={NavLink} to="/categories">
            <BiCategoryAlt style={{ marginRight: "0.5em" }} size="1.5em" />
            Kategoriler
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Ürün, Kategori, Ara..." />
            </Menu.Item>
          </Menu.Menu>

          <Menu.Item>
            <User />
          </Menu.Item>
          <Menu.Item>
            <Notifications />
          </Menu.Item>
          <Menu.Item>
            <Settings />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
