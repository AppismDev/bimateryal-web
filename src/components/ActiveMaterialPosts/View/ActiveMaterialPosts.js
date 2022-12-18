import React, { useEffect, useState } from "react";
import { user } from "../../../pages/SignInPage/signInSlice";
import { useDispatch, useSelector } from "react-redux";
import MaterialCard from "../../Material/MaterialCard/View/MaterialCard";
import {
  fetchUserMaterials,
  selectUserMaterialLoading,
  selectUserMaterials,
  selectUser,
} from "../../../pages/ProfilePage/profileSlice";

export default function ActiveMaterialPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const userState = useSelector(selectUser);
  const userMaterialLoading = useSelector(selectUserMaterialLoading);
  const userMaterials = useSelector(selectUserMaterials);
  useEffect(() => {
    dispatch(fetchUserMaterials(userState.uid));
  }, []);

  return (
    <>
      {userMaterialLoading && <p>Loading...</p>}
      <div className="active-material-posts-grid">
        {userMaterials &&
          userMaterials.length > 0 &&
          userMaterials.map((post) => <MaterialCard material={post} />)}
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
