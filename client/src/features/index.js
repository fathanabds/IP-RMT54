import { configureStore } from '@reduxjs/toolkit';
import myRecipesReducer from './myRecipesSlice';

export default configureStore({
  reducer: {
    myRecipes: myRecipesReducer,
  },
});
