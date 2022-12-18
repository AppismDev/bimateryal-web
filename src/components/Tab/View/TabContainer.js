import React, { useEffect, useState } from "react";
import { BiNews, BiHome } from "react-icons/bi";
import ActiveMaterialPosts from "../../ActiveMaterialPosts/View/ActiveMaterialPosts";
import UserDetails from "../../UserDetails/View/UserDetails";
export default function TabContainer() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let tabIndicator = document.getElementsByClassName("tab-indicator")[0];
    tabIndicator.style.left = `calc((calc(100% / 2) * ${activeTab}))`;
  }, [activeTab]);
  const pages = [<ActiveMaterialPosts />, <UserDetails />];
  return (
    <div class="tabs">
      <div class="tab-header">
        <div
          onClick={() => {
            setActiveTab(0);
          }}
          className={activeTab === 0 ? "tabs-tab active" : "tabs-tab"}
        >
          <BiHome /> Aktif İlanlar
        </div>
        <div
          className={activeTab === 1 ? "tabs-tab active" : "tabs-tab"}
          onClick={() => {
            setActiveTab(1);
          }}
        >
          <BiHome /> İlanlar
        </div>

        <span class="tab-indicator"></span>
      </div>

      <div class="tab-body">{pages[activeTab]}</div>
    </div>
  );
}
