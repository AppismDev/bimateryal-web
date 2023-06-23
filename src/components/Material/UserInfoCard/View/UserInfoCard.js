import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../userInfoAPI";

export default function UserInfoCard(props) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState({});
  useEffect(() => {
    const getuser = async () => {
      setIsLoading(true);
      const user = await getUserInfo(props.userID);
      console.log(user);
      setUserInfo(user);
      setIsLoading(false);
    };

    getuser();
    // return () => {};
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Yükleniyor...</div>
      ) : (
        <Link
          to={{ pathname: `/users/profile/${userInfo.uid}` }}
          className="user-card"
        >
          <img
            class="user-card-img"
            src={
              userInfo.photoUrl ||
              `https://ui-avatars.com/api/?name=${userInfo.displayName}`
            }
            alt="ürün resmi"
          />
          <div>{userInfo.displayName}</div>
        </Link>
      )}
    </div>
  );
}
