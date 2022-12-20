import React, { useEffect, useRef } from "react";
import { BsBoxArrowUp, BsChatDots } from "react-icons/bs";
import { VscReport } from "react-icons/vsc";
import { MdClose, MdOutlineAddBox } from "react-icons/md";
import UserInfoCard from "../../../components/Material/UserInfoCard/View/UserInfoCard";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../SignInPage/signInSlice";
import {
  openDialog,
  isDialogOpenSelector,
  closeDialog,
  addMaterialRequestAsync,
  getMaterialRequestsAsync,
  isMaterialRequestsLoadingSelector,
  materialRequestsSelector,
} from "../materialDetailsSlice";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import RequestorDetails from "../../../components/Material/RequestorCard/View/RequestorDetails";
import { getMaterialById } from "../materialDetailsAPI";
import { getUserInfo } from "../../../components/Material/UserInfoCard/userInfoAPI";

export default function MaterialDetails(props) {
  const dispatch = useDispatch();
  const [requestText, setRequestText] = useState("");
  // const isDialogOpen = useSelector(isDialogOpenSelector);
  const { isDialogOpen, loading } = useSelector(
    (state) => state.materialDetails
  );
  const userState = useSelector(user);

  const [isOwner, setIsOwner] = useState(false);
  var { material } = props.location.state || {};

  const [materialData, setMaterialData] = useState(material);

  const [isLoading, setIsLoading] = useState(false);
  const materialRequests = useSelector(materialRequestsSelector);
  const isMaterialRequestsLoading = useSelector(
    isMaterialRequestsLoadingSelector
  );

  useEffect(() => {
    console.log("MaterialDetailsPage useEffect");
    if (materialData === undefined) {
      setIsLoading(true);
      getMaterialById(props.match.params.id).then((materialData) => {
        setIsLoading(false);
        material = materialData;
        setMaterialData(materialData);
      });
    } else {
      if (userState.uid === materialData.ownerUserId) {
        setIsOwner(true);
        dispatch(getMaterialRequestsAsync(materialData.id));
      }
    }

    return () => {
      dispatch(closeDialog());
    };
  }, [materialData]);

  if (isOwner) {
    return (
      <>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          materialData != undefined && (
            <div class="product-detail-main">
              <div class="product-detail-up">
                <div className="product-detail-up-left">
                  <img
                    className="product-detail-up-left-img "
                    src={materialData.coverImageUrl}
                    alt="ürün resmi"
                  />
                  <div class="product-info">
                    <div className="product-info-header">
                      {materialData.name}
                    </div>
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(materialData.id);
                        toast.success("İtem no panoya kopyalandı");
                      }}
                      id="product-info-item-id"
                    >
                      {"İtem no: " + materialData.id}
                    </div>
                    <p className="product-info-p">{materialData.name}</p>
                  </div>
                </div>
                <div class="other-details">
                  <div class="other-details-user">
                    <h3>İlan Sahibi</h3>
                    <UserInfoCard userID={materialData.ownerUserId} />
                  </div>
                  <div className="other-details-location">
                    <h3>Konum</h3>
                    <div className="other-details-location-exp">
                      {materialData.location || "Konum Bilgisi Yok"}
                    </div>
                    <img
                      class="other-details-location-img"
                      src="https://cbsakademi.ibb.istanbul/wp-content/uploads/2016/10/kapak.jpg"
                      alt="harita"
                    />
                  </div>
                </div>
              </div>
              <div class="product-detail-down">
                <h2 class="product-detail-down-title">
                  {`Medya &
          Dosyalar (${materialData.mediaUrls.length})`}
                </h2>

                <div class="product-detail-down-other-products">
                  {materialData.mediaUrls.map((mediaUrl) => {
                    return (
                      <img
                        className="product-detail-down-other-products-img"
                        src={mediaUrl}
                        alt="ürün resmi"
                      />
                    );
                  })}
                </div>
                {isMaterialRequestsLoading ? (
                  <div>Yükleniyor...</div>
                ) : (
                  <div className="product-detail-requestors-column">
                    <h2 class="product-detail-down-title">
                      {`Talep Eden Kişiler (${materialRequests.length})`}
                    </h2>
                    {materialRequests &&
                      materialRequests.map((request) => {
                        return <RequestorDetails request={request} />;
                      })}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </>
    );
  }
  return (
    <div>
      {isDialogOpen && getDialog()}
      {materialData && (
        <div class="product-detail-main">
          <div class="product-detail-up">
            <div className="product-detail-up-left">
              <img
                className="product-detail-up-left-img "
                src={materialData.coverImageUrl}
                alt="ürün resmi"
              />
              <div class="product-info">
                <div className="product-info-header">{materialData.name}</div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(materialData.id);
                    toast.success("İtem no panoya kopyalandı");
                  }}
                  id="product-info-item-id"
                >
                  {"İtem no: " + materialData.id}
                </div>
                <p className="product-info-p">{materialData.name}</p>

                {materialData.status == "completed" ? (
                  <div>Bu materyal için talep isteği oluşturulamaz.</div>
                ) : (
                  <div class="pd-icons">
                    <div className="pd-icon-column">
                      <BsBoxArrowUp size="1.5em" />
                      <div>Paylaş</div>
                    </div>

                    <div className="pd-icon-column">
                      <VscReport size="1.5em" />
                      <div>Şikayet Et</div>
                    </div>

                    <div className="pd-icon-column">
                      <BsChatDots size="1.5em" />
                      <div>Mesaj At</div>
                    </div>

                    <div
                      onClick={async (e) => {
                        e.preventDefault();

                        dispatch(openDialog());
                      }}
                      className="pd-icon-column"
                    >
                      <MdOutlineAddBox size="1.5em" />
                      <div>{`Talep Et (${materialData.price} puan)`}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div class="other-details">
              <div class="other-details-user">
                <h3>İlan Sahibi</h3>
                <UserInfoCard userID={materialData.ownerUserId} />
              </div>
              <div className="other-details-location">
                <h3>Konum</h3>
                <div className="other-details-location-exp">
                  {materialData.location || "Konum Bilgisi Yok"}
                </div>
                <img
                  class="other-details-location-img"
                  src="https://cbsakademi.ibb.istanbul/wp-content/uploads/2016/10/kapak.jpg"
                  alt="harita"
                />
              </div>
            </div>
          </div>
          <div class="product-detail-down">
            <h2 class="product-detail-down-title">
              {`Medya &
              Dosyalar (${materialData.mediaUrls.length})`}
            </h2>

            <div class="product-detail-down-other-products">
              {materialData.mediaUrls.map((mediaUrl) => {
                return (
                  <img
                    className="product-detail-down-other-products-img"
                    src={mediaUrl}
                    alt="ürün resmi"
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function getDialog() {
    return (
      <ClickAwayListener
        onClickAway={() => {
          dispatch(closeDialog());
        }}
      >
        <div className="product-detail-dialog animate__animated animate__fadeIn">
          <div className="product-detail-dialog-header">
            <div className="product-detail-dialog-header-title">
              Materyal: {materialData.name}
            </div>
            <div className="product-detail-dialog-header-close">
              <MdClose
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(closeDialog());
                }}
              />
            </div>
          </div>
          <div>
            Talep etmek istediğiniz materyal için açıklama giriniz: (Opsiyonel)
          </div>
          <textarea
            value={requestText}
            onChange={(e) => {
              setRequestText(e.target.value);
            }}
            className="product-detail-dialog-textfield"
          />
          <button
            disabled={loading}
            onClick={async () => {
              var userInfo = await getUserInfo(userState.uid);
              if (userInfo.points < materialData.price) {
                toast.error(
                  "Yeterli puanınız yok. Mevcut puanınız: " +
                    userInfo.points +
                    ""
                );
                return;
              }
              dispatch(
                addMaterialRequestAsync({
                  materialId: materialData.id,
                  ownerId: materialData.ownerUserId,
                  requestorId: userState.uid,
                  price: materialData.price,
                  addressId: null,
                  materialName: materialData.name,
                  description: requestText,
                })
              );
            }}
            className="create-request-button"
          >
            {loading ? "Yükleniyor..." : "Talep Oluştur"}
          </button>
        </div>
      </ClickAwayListener>
    );
  }
}
