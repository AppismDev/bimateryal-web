import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  searchedCategoriesSelector,
  searchCategories,
  searchErrorSelector,
  categoriesLoadingSelector,
  materialsLoadingSelector,
  subCategoriesLoadingSelector,
  usersLoadingSelector,
  searchMaterials,
  searchQuerySelector,
  searchSubCategories,
  searchUsersAsync,
  searchedMaterialsSelector,
  searchedSubCategoriesSelector,
  searchedUsersSelector,
  setSearchQuery,
  clearSearchBar,
  searchCategoriesAsync,
  searchMaterialsAsync,
} from "../searchbarSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(searchQuerySelector);
  const isUsersLoading = useSelector(usersLoadingSelector);
  const isCategoriesLoading = useSelector(categoriesLoadingSelector);
  const users = useSelector(searchedUsersSelector);
  const categories = useSelector(searchedCategoriesSelector);

  const materials = useSelector(searchedMaterialsSelector);
  const isMaterialsLoading = useSelector(materialsLoadingSelector);
  const [isInputActive, setIsInputActive] = React.useState(false);

  useEffect(() => {
    var body = document.querySelector("body");
    var input = document.querySelector(".search-bar");

    body.onclick = function (e) {
      if (e.target.className === "search-bar") {
        console.log("search bar clicked: ", searchQuery);
        // change target class name
        setIsInputActive(true);
      }

      if (e.target.className !== "search-bar active") {
        // change target class name

        input.classList.remove("active");
        setIsInputActive(false);
      }
    };

    // input.onclick = function (e) {
    //   toast(`input classlist ${input.classList}`);
    // };
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsInputActive(true);
      dispatch(searchUsersAsync(searchQuery));
      dispatch(searchMaterialsAsync(searchQuery));
      dispatch(searchCategoriesAsync(searchQuery));
      //   dispatch(searchSubCategories(searchQuery));
    } else {
      setIsInputActive(false);
    }
  }, [searchQuery]);

  return (
    <div className="search-bar-container">
      <CiSearch size={24} className="search-bar-icon" />
      <IoIosCloseCircleOutline
        onClick={() => {
          dispatch(setSearchQuery(""));
          dispatch(clearSearchBar());
        }}
        size={24}
        className="search-bar-icon-clear"
      />
      <input
        value={searchQuery}
        onChange={(e) => {
          e.preventDefault();
          dispatch(setSearchQuery(e.target.value));
        }}
        className={isInputActive ? "search-bar active" : "search-bar"}
        type="text"
        placeholder="Kitap, Kalem, Defter..."
      />
      <div
        className={
          isInputActive
            ? "search-bar-content-container active"
            : "search-bar-content-container hidden"
        }
      >
        <>
          {searchQuery.length >= 3 ? (
            <div className="search-bar-content-section">
              <>
                <h3>Kullanıcılar</h3>
                {isUsersLoading ? (
                  <p id="search-bar-three-characters">Yükleniyor...</p>
                ) : users && users.length > 0 ? (
                  <div className="search-bar-content-section-body">
                    {users.map((user) => (
                      <Link
                        to={`/users/profile/${user.uid}`}
                        className="search-bar-content-section-body-item animate__animated animate__fadeIn"
                        key={user.uid}
                      >
                        <img
                          src={
                            user.photoUrl ||
                            "https://www.w3schools.com/howto/img_avatar.png"
                          }
                          alt=""
                        />
                        <div>{user.displayName}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p id="search-bar-three-characters">Kullanıcı bulunamadı</p>
                )}
              </>
              <>
                <h3>Kategoriler</h3>
                {isCategoriesLoading ? (
                  <p id="search-bar-three-characters">Yükleniyor...</p>
                ) : categories && categories.length > 0 ? (
                  <div className="search-bar-content-section-body">
                    {categories.map((category) => (
                      <Link
                        to={`/categoryMaterials?id=${category.categoryId}&name=${category.categoryName}`}
                        className="search-bar-content-section-body-item animate__animated animate__fadeIn"
                        key={category.categoryId}
                      >
                        <img
                          src={
                            category.categoryIconUrl ||
                            "https://www.w3schools.com/howto/img_avatar.png"
                          }
                          alt=""
                        />
                        <div>{category.categoryName}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p id="search-bar-three-characters">Kategori bulunamadı</p>
                )}
              </>
              <>
                <h3>Materyaller</h3>
                {isMaterialsLoading ? (
                  <p id="search-bar-three-characters">Yükleniyor...</p>
                ) : materials && materials.length > 0 ? (
                  <div className="search-bar-content-section-body">
                    {materials.map((material) => (
                      <Link
                        to={{
                          pathname: `/material/details/${material.id}`,
                          state: { material: material },
                        }}
                        className="search-bar-content-section-body-item animate__animated animate__fadeIn"
                        key={material.name}
                      >
                        <img
                          src={
                            material.coverImageUrl ||
                            "https://www.w3schools.com/howto/img_avatar.png"
                          }
                          alt=""
                        />
                        <div>{material.name}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p id="search-bar-three-characters">Materyal bulunamadı</p>
                )}
              </>
            </div>
          ) : (
            <p id="search-bar-three-characters">
              Arama yapmak için en az 3 karakter giriniz
            </p>
          )}
        </>
      </div>
    </div>
  );
}
