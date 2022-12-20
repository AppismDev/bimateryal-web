import React from "react";
import { MdLocationOn } from "react-icons/md";
import TabContainer from "../../../components/Tab/View/TabContainer";
import { useDispatch, useSelector } from "react-redux";
import profileSlice, {
  clearState,
  fetchUser,
  selectIsLoading,
  selectUser,
} from "../profileSlice";
export default function ProfilePage(props) {
  const loading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchUser(props.match.params.id));

    return () => {
      dispatch(clearState());
    };
  }, [props.match.params.id]);

  return (
    <div>
      {loading ? (
        <div className="loader">Yükleniyor...</div>
      ) : user ? (
        <div className="profile-page-container">
          <div className="profile-page-left">
            <img
              className="profile-page-left-img"
              src={
                user.photoUrl ||
                "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="profile"
            />

            <div className="profile-page-left-info">
              <div className="profile-page-left-info-header">
                <h4>Adresler</h4>
                <div className="profile-page-left-info-header-divider" />
              </div>
              <div className="profile-page-left-info-addresses">
                {[1, 1, 1].map((e) => (
                  <div className="profile-page-left-info-addresses-item">
                    <div className="profile-page-left-info-addresses-item-header">
                      <div className="profile-page-left-info-addresses-item-header-title">
                        Adres Başlığı
                      </div>
                      <div className="profile-page-left-info-addresses-item-header-container">
                        Birincil
                      </div>
                    </div>
                    <div className="profile-page-left-info-addresses-item-body">
                      Sivas Üniversite Toki Eğriköprü Mahallesi 75/24 SK C6 Blok
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="profile-page-right">
            <div className="profile-page-right-header">
              <div id="profile-page-right-user-name">{user.displayName}</div>
              <div className="profile-page-right-header-icon-row">
                <MdLocationOn />
                <div>Sivas, Türkiye</div>
              </div>
            </div>

            <div id="profile-page-right-joined-at-row">
              {user.createdAt.toDate().toLocaleDateString() +
                " tarihinde katıldı."}
            </div>
            <div id="profile-page-right-rankings">
              <div id="profile-page-right-rankings-title">Puan</div>
              <div id="profile-page-right-rankings-body">
                <div>Bugüne kadar {user.earnedPoints} puan kazanıldı. </div>
              </div>
            </div>
            <TabContainer />
          </div>
        </div>
      ) : (
        <div>404</div>
      )}
    </div>
  );
}
