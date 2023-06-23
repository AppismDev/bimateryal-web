import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { rejectMaterialRequest } from "../../../../pages/MaterialDetailsPage/materialDetailsAPI";
import {
  approveMaterialRequestAsync,
  rejectMaterialRequestAsync,
} from "../../../../pages/MaterialDetailsPage/materialDetailsSlice";
import {
  closeDialog,
  openDialog,
} from "../../../DialogContainer/dialogContainerSlice";
import { getUserInfo } from "../../UserInfoCard/userInfoAPI";
export default function RequestorDetails(props) {
  const history = useHistory();
  const { request } = props;

  const [requestorUser, setRequestorUser] = React.useState(null);
  const [isUserLoading, setIsUserLoading] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getuser = async () => {
      setIsUserLoading(true);
      const user = await getUserInfo(request.requestorId);

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
      <p>
        {request.description || request.description.isEmpty
          ? request.description
          : "Açıklama yok"}
      </p>
      <div className="requestor-button-row">
        {request.status != "approved" && (
          <button
            onClick={(e) => {
              dispatch(
                openDialog({
                  title: "Kabul et",
                  content:
                    "Bu talebi kabul etmek istediğinize emin misiniz? Talep kabul edildiği takdirde diğer tüm talepler otomatik olarak reddedilecektir..",
                  primaryButtonText: "Kabul Et",
                  cancelButtonText: "İptal",
                  onPrimaryButtonClick: async () => {
                    await toast.promise(
                      dispatch(
                        approveMaterialRequestAsync({
                          materialId: request.materialId,
                          requestId: request.id,
                          ownerId: request.ownerId,
                          requestorId: request.requestorId,
                          materialName: request.materialId,
                          materialPrice: request.price,
                        })
                      ),
                      {
                        pending: "Talep kabul ediliyor.",
                        success: "Talep kabul edildi.",
                        error:
                          "Talep kabul edilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin",
                      }
                    );
                    dispatch(closeDialog());
                  },
                })
              );
            }}
          >
            Onayla
          </button>
        )}
        <button onClick={() => {
          // go to chat page
          // link to chat page
          history.push({ pathname: `/messages`, state: { user: requestorUser } })


        }}>İletişime geç</button>
        {request.status != "approved" && (
          <button
            onClick={(e) => {
              dispatch(
                openDialog({
                  title: "Reddet",
                  content:
                    "Bu talebi reddetmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
                  primaryButtonText: "Reddet",
                  cancelButtonText: "İptal",
                  onPrimaryButtonClick: async () => {
                    dispatch(closeDialog());
                    await toast.promise(
                      dispatch(
                        rejectMaterialRequestAsync({
                          materialId: request.materialId,
                          requestId: request.id,
                          ownerId: request.ownerId,
                          requestorId: request.requestorId,
                          materialName: request.materialId,
                          materialPrice: request.price,
                        })
                      ),
                      {
                        pending: "Talep reddediliyor.",
                        success: "Talep reddedildi.",
                        error:
                          "Talep reddedilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin",
                      }
                    );
                  },
                })
              );
            }}
            className="cancel"
          >
            Reddet
          </button>
        )}
      </div>
    </div>
  );
}
