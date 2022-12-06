import React from "react";

const users = [
  {
    userImage: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    userName: "Ahmet",
    totalPoints: 250,
  },
  {
    userImage: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    userName: "Mehmet",
    totalPoints: 250,
  },
  {
    userImage: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    userName: "Ali",
    totalPoints: 250,
  },
  {
    userImage: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    userName: "Veli",
    totalPoints: 250,
  },
  {
    userImage: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    userName: "Veli",
    totalPoints: 250,
  },
];

export default function PopularUsers() {
  return (
    <div className="home-page-popular-users">
      <div className="home-page-popular-users-header">
        <h2>Popüler Kullanıcılar</h2>
        <a href="/">Liderlik Tablosu</a>
      </div>
      <div className="home-page-popular-users-content">
        {users.map((users) => (
          <div className="home-page-popular-users-item">
            <img src={users.userImage} alt="popular-usersImage" />
            <div className="home-page-popular-users-item-content">
              <div className="home-page-popular-users-item-content-title">
                {users.userName}
              </div>
              <div className="home-page-popular-users-item-content-subtitle">
                {users.totalPoints} Puan
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
