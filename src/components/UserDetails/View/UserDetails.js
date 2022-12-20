import React from "react";
import { useSelector } from "react-redux";
import { user } from "../../../pages/SignInPage/signInSlice";
export default function UserDetails() {
  const userData = useSelector(user);
  return (
    <div className="user-details-root">
      <div>{JSON.stringify(userData)}</div>
    </div>
  );
}
