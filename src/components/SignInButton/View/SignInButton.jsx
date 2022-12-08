import React from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

export default function SignInButton({ iconType, onClick }) {
  return (
    <button className="sign-in-button" onClick={onClick}>
      {iconType === "google" ? <FcGoogle /> : <SiFacebook />}
      <span className="sign-in-button-title">{`${iconType} ile giriş yap`}</span>
    </button>
  );
}
