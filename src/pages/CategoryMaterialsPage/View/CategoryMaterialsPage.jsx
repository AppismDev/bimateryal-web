import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryMaterialsAsync,
  selectCategoryMaterialsPage,
  selectCategoryMaterials,
  selectCategoryMaterialsLoading,
  clearState,
} from "../categorySlice";
import useQuery from "../../../utilities/customHooks/useQuery";
import MaterialCard from "../../../components/Material/MaterialCard/View/MaterialCard";
export default function CategoryMaterialsPage(props) {
  const dispatch = useDispatch();
  const page = useSelector(selectCategoryMaterialsPage);
  const loading = useSelector(selectCategoryMaterialsLoading);
  const categoryMaterials = useSelector(selectCategoryMaterials);

  let query = useQuery();

  useEffect(() => {
    dispatch(getCategoryMaterialsAsync({ page, categoryId: query.get("id") }));
    return () => {
      dispatch(clearState());
    };
  }, []);

  return (
    <div className="category-materials-root">
      <h3>{query.get("name")}</h3>
      {loading && <div>Yükleniyor...</div>}
      {selectCategoryMaterials && (
        <div className="category-materials-grid">
          {categoryMaterials.map((material) => {
            return <MaterialCard material={material} />;
          })}
        </div>
      )}
    </div>
  );
}
