import { createSlice } from '@reduxjs/toolkit';
import axiosClient from '../helpers/axiosClient';
import Swal from 'sweetalert2';

export const myRecipesSlice = createSlice({
  name: 'my recipes',
  initialState: {
    recipes: {
      value: [],
    },
    favoriteRecipes: {
      value: [],
    },
  },
  reducers: {
    setRecipes: (state, action) => {
      state.recipes.value = action.payload;
    },
    setFavoriteRecipes: (state, action) => {
      state.favoriteRecipes.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecipes, setFavoriteRecipes } = myRecipesSlice.actions;

export const fetchMyRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClient.get('/user-recipes', {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      dispatch(setRecipes(data));
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  };
};

export const fetchMyFavoriteRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClient.get('/user-recipes/favorite', {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      dispatch(setFavoriteRecipes(data));
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  };
};

export default myRecipesSlice.reducer;
