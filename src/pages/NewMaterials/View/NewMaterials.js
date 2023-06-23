import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialCard from "../../../components/Material/MaterialCard/View/MaterialCard";
import {
  getNewMaterialsAsync,
  selectNewMaterials,
  selectNewMaterialsLoading,
} from "../newMaterialsSlice";
export default function NewMaterials() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectNewMaterialsLoading);
  const materials = useSelector(selectNewMaterials);
  useEffect(() => {
    document.title = "New Materials";
    dispatch(getNewMaterialsAsync());
  }, []);

  return (
    <div>
      {isLoading && <div>Yükleniyor...</div>}
      {materials && (
        <div className="category-materials-grid">
          {materials.map((material) => (
            <MaterialCard material={material} />
          ))}
        </div>
      )}
    </div>
  );
}
