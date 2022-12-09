import React from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook, SiGoogle } from "react-icons/si";

export default function SignInButton({ iconType, onClick }) {
  return (
    <button className={`sign-in-button-${iconType}`} onClick={onClick}>
      {getButtonIcon(iconType)}
      <span className="sign-in-button-title">{`${iconType} ile giriş yap`}</span>
    </button>
  );
}

// get the icon type from props switch the icon type and return the icon
function getButtonIcon(iconType) {
  switch (iconType) {
    case "google":
      return <SiGoogle />
    case "facebook":
      return <SiFacebook />
    default:
      return null
  }
}