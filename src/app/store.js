import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../pages/SignInPage/signInSlice";
import addMaterialSlice from "../pages/AddMaterial/addMaterialSlice";
import categoriesSlice from "../pages/CategoriesPage/categoriesSlice";
import homePageCategoriesSlice from "../components/HomePage/Categories/homePageCategoriesSlice";
import categoryMaterialsSlice from "../pages/CategoryMaterialsPage/categorySlice";
import popularUsersSlice from "../components/HomePage/PopularUsers/popularUsersSlice";
import newProductsSlice from "../components/HomePage/NewProducts/newProductsSlice";

export const store = configureStore({
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({
  //   serializableCheck: {
  //     // Ignore these action types
  //     ignoredActions: ['your/action/'],
  //     // Ignore these field paths in all actions
  //     ignoredActionPaths: ['payload'],
  //     // Ignore these paths in the state
  //     ignoredPaths: ['payload'],
  //   },
  // }),
  reducer: {
    counter: counterReducer,
    user: userReducer,
    addMaterial: addMaterialSlice,
    categories: categoriesSlice,
    homePageCategories: homePageCategoriesSlice,
    categoryMaterials: categoryMaterialsSlice,
    popularUsers: popularUsersSlice,
    newMaterials: newProductsSlice,
  },
});
