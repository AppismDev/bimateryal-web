import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Line, RiImageAddFill } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  isMainPhotoDragActive,
  mainPhoto,
  setIsMainPhotoDragActive,
  setMainPhoto,
  setMaterialCategory,
  setMaterialDescription,
  setMaterialMedia,
  setMaterialName,
  allStateValue,
  setMaterialPrice,
  materialPrice,
  setMaterialSubCategory,
  materialCategory,
  materialSubCategory,
  setIsMaterialMediasDragActive,
  materialMedia,
  isLoading,
  addMaterialAsync,
  materialName,
  materialDescription,
} from "../addMaterialSlice";

import {
  categoriesSelector,
  categoriesLoadingSelector,
  getCategoriesAsync,
  subcategoriesSelector,
  getSubCategoriesAsync,
  subcategoriesLoadingSelector,
} from "../../CategoriesPage/categoriesSlice";
import { toast } from "react-toastify";

export default function AddMaterial() {
  const mainImageRef = useRef(null);
  const mediaInputRef = useRef(null);

  const categoriesState = useSelector(categoriesSelector);
  const categoriesLoadingState = useSelector(categoriesLoadingSelector);
  const isLoadingState = useSelector(isLoading);

  const subcategoriesState = useSelector(subcategoriesSelector);
  const subcategoriesLoadingState = useSelector(subcategoriesLoadingSelector);

  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const isMainPhotoDragActiveState = useSelector(isMainPhotoDragActive);
  const mainPhotoState = useSelector(mainPhoto);
  const allState = useSelector(allStateValue);

  const materialCategoryState = useSelector(materialCategory);
  const materialSubCategoryState = useSelector(materialSubCategory);
  const materialMediaState = useSelector(materialMedia);
  const materialNameState = useSelector(materialName);
  const materialDescriptionState = useSelector(materialDescription);
  const materialPriceState = useSelector(materialPrice);

  // ------------------------------- kategoriler ve subcategoryler daha önce getirilmediyse git getir ------------------------------
  useEffect(() => {
    if (categoriesLoadingState) return;
    if (categoriesState && categoriesState.length > 0) return;
    dispatch(getCategoriesAsync());
  }, []);

  useEffect(() => {
    if (subcategoriesLoadingState) return;
    if (subcategoriesState && subcategoriesState.length > 0) return;

    dispatch(getSubCategoriesAsync());
  }, []);

  // ------------------------------- kategoriler ve subcategoryler daha önce getirilmediyse git getir ------------------------------

  // ------------------------------------- main inputa drag ve drop edilince yapılacak işlemler -------------------------------------

  const handleMediaDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      dispatch(setIsMaterialMediasDragActive(true));
    } else if (e.type === "dragleave") {
      dispatch(setIsMaterialMediasDragActive(false));
    }
  };

  const handleMediaDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setIsMaterialMediasDragActive(false));
    if (e.dataTransfer.files) {
      console.log("Material medias: ", e.dataTransfer.files);
      dispatch(setMaterialMedia([...e.dataTransfer.files]));
    }
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      dispatch(setIsMainPhotoDragActive(true));
    } else if (e.type === "dragleave") {
      dispatch(setIsMainPhotoDragActive(false));
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setIsMainPhotoDragActive(false));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      dispatch(setMainPhoto(e.dataTransfer.files[0]));
    }
  };

  // ------------------------------------- main inputa drag ve drop edilince yapılacak işlemler -------------------------------------
  return (
    <div>
      {isLoadingState && (
        <div className="add-material-loading">Yükleniyor...</div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (mainPhotoState == undefined) {
            toast.error("Lütfen bir fotoğraf seçiniz");
            return;
          }
          if (materialNameState == undefined) {
            toast.error("Lütfen bir isim giriniz");
            return;
          }
          if (materialDescriptionState == undefined) {
            toast.error("Lütfen bir açıklama giriniz");
            return;
          }

          if (materialCategoryState == undefined) {
            toast.error("Lütfen bir kategori seçiniz");
            return;
          }

          if (materialSubCategoryState == undefined) {
            toast.error("Lütfen bir alt kategori seçiniz");
            return;
          }

          if (materialPriceState == undefined) {
            toast.error("Lütfen bir fiyat giriniz");
            return;
          }

          if (materialMediaState == undefined) {
            toast.error("Lütfen bir fotoğraf seçiniz");
            return;
          }

          const data = {
            name: materialNameState,
            description: materialDescriptionState,
            categoryId: materialCategoryState,
            subCategoryId: materialSubCategoryState,
            price: materialPriceState,
            coverImage: mainPhotoState,
            location: null,
            media: materialMediaState,
            ownerUserId: userState.user.uid,
          };
          dispatch(addMaterialAsync(data));
        }}
        className="add-material-root"
      >
        <div id="add-material-left">
          {mainPhotoState && (
            <div className="add-material-main-photo-container">
              <img
                id="add-material-main-photo"
                src={URL.createObjectURL(mainPhotoState)}
              />
              <div>
                {mainPhotoState.name} - {mainPhotoState.size} bytes
              </div>
            </div>
          )}
          <form
            onClick={() => {
              mainImageRef.current.click();
            }}
            className="add-material-choose-photo-container"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            handleDrop={handleDrop}
          >
            <input
              ref={mainImageRef}
              style={{ display: "none" }}
              accept="image/*"
              type="file"
              name="input-name"
              onChange={(e) => {
                if (e.target.files[0]) {
                  dispatch(setMainPhoto(e.target.files[0]));
                }
              }}
              multiple={false}
            />
            <RiImageAddFill color="00983a" fontSize={80} />
            {!isMainPhotoDragActiveState ? (
              <div>
                <div id="add-material-photo-text">+ Materyal Fotoğrafı Seç</div>
                <div id="add-material-photo-subtitle">
                  Fotoğrafı seçin veya sürükleyin
                </div>
              </div>
            ) : (
              <div id="add-material-photo-text">Fotoğrafı bırakın</div>
            )}
          </form>
        </div>
        <div id="add-material-right">
          <div className="add-material-label-column">
            <div className="add-material-select-label">Materyal Adı</div>
            <input
              id="add-material-input"
              name="add-material-input"
              required
              onChange={(e) => {
                dispatch(setMaterialName(e.target.value));
              }}
            />
          </div>
          <div className="add-material-label-column">
            <div className="add-material-select-label">Materyal Kategorisi</div>
            <select
              required
              disabled={categoriesLoadingState}
              id="add-material-category-select"
              value={materialCategoryState}
              onChange={(e) => {
                console.log("onchange triggerd");
                dispatch(setMaterialCategory(e.target.value));
              }}
            >
              {categoriesLoadingState && (
                <option value="" disabled selected>
                  Yükleniyor...
                </option>
              )}
              {categoriesState && !materialCategoryState && (
                <option value="" disabled selected>
                  Kategori Seçiniz
                </option>
              )}
              {categoriesState &&
                categoriesState.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
          </div>
          <div className="add-material-label-column">
            <div className="add-material-select-label">
              Materyal Alt Kategorisi
            </div>
            <select
              disabled={subcategoriesLoadingState}
              value={materialSubCategoryState}
              required
              id="add-material-category-select"
              onChange={(e) => {
                dispatch(setMaterialSubCategory(e.target.value));
              }}
            >
              {subcategoriesLoadingState && materialCategoryState && (
                <option value="" disabled selected>
                  Yükleniyor...
                </option>
              )}

              {!materialCategoryState && (
                <option value="" disabled selected>
                  Lütfen önce bir kategori seçiniz.
                </option>
              )}
              {materialCategoryState && !materialSubCategoryState && (
                <option value="" disabled selected>
                  Lütfen bir alt kategori seçiniz.
                </option>
              )}
              {subcategoriesState &&
                materialCategoryState &&
                subcategoriesState
                  .filter((e) => e.categoryId == materialCategoryState)
                  .map((subcategory) => {
                    return (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    );
                  })}
            </select>
          </div>
          <div
            className="add-material-label-column"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
          >
            <div className="add-material-select-label">Puan Karşılığı</div>
            <input
              min={100}
              max={300}
              required
              onChange={(e) => {
                if (e.target.value > 300) {
                  e.target.value = 300;
                }

                dispatch(setMaterialPrice(e.target.value));
              }}
              id="add-material-input"
              type="number"
              name="add-material-input"
            />

            {materialCategoryState && (
              <div className="add-material-info-text-container">
                <AiOutlineInfoCircle size={24} />
                {`${
                  categoriesState.find(
                    (e) => e.categoryId == materialCategoryState
                  ).categoryName
                } kategorisi için minimum ${
                  categoriesState.find(
                    (e) => e.categoryId == materialCategoryState
                  ).minScore
                }, maximum ${
                  categoriesState.find(
                    (e) => e.categoryId == materialCategoryState
                  ).maxScore
                } puan seçebilirsiniz.`}
              </div>
            )}
            <div id="add-material-text-area-container">
              <div className="add-material-select-label">
                Materyal Açıklaması
              </div>
              <textarea
                required
                id="add-material-text-area"
                placeholder="Materyal açıklamasını giriniz"
                onChange={(e) => {
                  dispatch(setMaterialDescription(e.target.value));
                }}
              />
            </div>

            <div className="add-material-label-column">
              <div className="add-material-select-label">Materyal Medyası</div>
              <form
                onDragEnter={handleMediaDrag}
                onDragOver={handleMediaDrag}
                onDragLeave={handleMediaDrag}
                onDrop={handleMediaDrop}
              >
                <input
                  ref={mediaInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  type="file"
                  name="input-media"
                />

                <div className="add-material-sub-images-container">
                  <div id="add-material-sub-images-add-more">
                    <RiImageAddFill
                      onClick={(e) => {
                        mediaInputRef.current.click();
                      }}
                      color="grey"
                      fontSize={32}
                    />
                  </div>
                  {materialMediaState.map((e, index) => {
                    return (
                      <div style={{ position: "relative" }}>
                        <div id="add-material-media-delete-icon">
                          <IoMdCloseCircle
                            onClick={(e) => {
                              dispatch(
                                setMaterialMedia([
                                  ...materialMediaState.filter(
                                    (e, i) => i != index
                                  ),
                                ])
                              );
                            }}
                          />
                        </div>
                        <img
                          key={index}
                          className="add-material-sub-image"
                          src={URL.createObjectURL(e)}
                        />
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
            <button type="submit" id="add-material-button">
              Materyal Ekle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
