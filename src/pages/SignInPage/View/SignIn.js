import React from "react";
import SignInButton from "../../../components/SignInButton/View/SignInButton.jsx";
import { useSelector, useDispatch } from "react-redux";
import { loginWithGoogle } from "../signInSlice";
export default function SignInPage() {
  const dispatch = useDispatch();

  return (
    <div className="sign-in-root">
      <div className="sign-in-intro-container">
        <div className="sign-in-intro-body">
          <h1 className="sign-in-intro-body-content">
            İhtiyacınız olan eğitim materyallerini edinin. İhtiyaç fazlası olan
            eğitim materyallerini bağışlayın. Ücretsiz kayıt olun.
          </h1>
        </div>
      </div>
      <div className="sign-in-buttons">
        <div>
          <h1 className="sign-in-buttons-header">BiMateryal'e Hoşgeldiniz</h1>
          <h5 className="sign-in-buttons-header">
            Kayıt olarak kullanım şartlarımızı ve üyelik şartlarımızı kabul
            etmiş olursunuz.
          </h5>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SignInButton
            iconType="google"
            onClick={async () => {
              dispatch(loginWithGoogle());
            }}
          />

          <SignInButton
            iconType="facebook"
            onClick={() => {
              console.log("Clicked");
            }}
          />
        </div>
      </div>
    </div>
  );
}
