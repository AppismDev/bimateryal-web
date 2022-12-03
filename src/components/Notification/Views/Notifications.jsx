import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";

export default function Notifications() {
  return (
    <Dropdown
      trigger={<Icon name="bell outline" size="large" />}
      pointing="top left"
      icon={null}
    >
      <Dropdown.Menu>
        <Dropdown.Item text="Bildirim1" />
        <Dropdown.Item text="Bildirim2" />
        <Dropdown.Item text="Bildirim3" />
      </Dropdown.Menu>
    </Dropdown>
  );
}
