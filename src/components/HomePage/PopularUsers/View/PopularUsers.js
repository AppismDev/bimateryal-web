import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getPopularUsersAsync,
  selectPopularUsers,
  selectPopularUsersLoading,
} from "../popularUsersSlice";

export default function PopularUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectPopularUsers);
  const isLoading = useSelector(selectPopularUsersLoading);

  React.useEffect(() => {
    dispatch(getPopularUsersAsync());
  }, []);

  return (
    <div className="home-page-popular-users">
      <div className="home-page-popular-users-header">
        <h2>Popüler Kullanıcılar</h2>
      </div>
      {isLoading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="home-page-popular-users-content">
          {users.map((users) => (
            <Link
              to={{ pathname: `/users/profile/${users.uid}` }}
              className="home-page-popular-users-item"
            >
              <img
                src={
                  users.photoUrl ??
                  "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
                alt="popular-usersImage"
              />
              <div className="home-page-popular-users-item-content">
                <div className="home-page-popular-users-item-content-title">
                  {users.displayName}
                </div>
                <div className="home-page-popular-users-item-content-subtitle">
                  {users.earnedPoints} Puan
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
