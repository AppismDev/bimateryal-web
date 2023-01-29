import { ClickAwayListener } from "@mui/material";
import React, { useEffect } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectNotifications,
  setNotificationAsReadedAsync,
} from "../../../pages/NotificationsPage/notificationsSlice";

export default function Notification() {
  const [isActive, setIsActive] = React.useState(false);
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        e.preventDefault();
        setIsActive(false);
      }}
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          setIsActive(!isActive);
        }}
        className="dropdown"
      >
        <FiBell size={24} />
        <div className={`item ${isActive ? "active" : ""}`}>
          {notifications.map((notification) => {
            return (
              <Link
                onClick={(e) => {
                  dispatch(setNotificationAsReadedAsync(notification.id));
                }}
                to={notification.type == "request" ? `/material/details/${notification.payload.requestedMaterialId}` : notification.type == "message" ? "/messages" : ""}
                className="notification-item"
              >
                <div className="notification-item__content">
                  <div className="notification-item__top">
                    <div className="notification-item__title">
                      {notification.title}
                    </div>
                    {!notification.isRead && (
                      <div className="notification-item-badge" />
                    )}
                  </div>

                  <div className="notification-item__bottom">
                    <div>{notification.description}</div>
                    <div className="notification-item__date">
                      {notification.createdAt.toDate().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </ClickAwayListener>
  );
}
