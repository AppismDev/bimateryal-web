import React, { useEffect } from "react";
import { getUserInfo } from "../../UserInfoCard/userInfoAPI";
export default function RequestorDetails(props) {
  const { request } = props;

  const [requestorUser, setRequestorUser] = React.useState(null);
  const [isUserLoading, setIsUserLoading] = React.useState(false);

  useEffect(() => {
    const getuser = async () => {
      setIsUserLoading(true);
      const user = await getUserInfo(request.requestorId);
      console.log("USER IS HERE: ", user);
      setRequestorUser(user);
      setIsUserLoading(false);
    };

    getuser();
  }, []);

  return (
    <div className="requestor-details-root">
      <div className="requestor-details-header">
        {isUserLoading && (
          <div className="requestor-name-row">
            <img src="https://www.w3schools.com/howto/img_avatar.png" />
            <h3>Bilinmeyen Kullanıcı</h3>
          </div>
        )}
        {!isUserLoading && requestorUser && (
          <div className="requestor-name-row">
            <img
              src={
                requestorUser.photoUrl ||
                "https://www.w3schools.com/howto/img_avatar.png"
              }
            />
            <h3>{requestorUser.displayName}</h3>
          </div>
        )}
        <h3>{request.requestDate.toDate().toDateString()}</h3>
      </div>
    </div>
  );
}
