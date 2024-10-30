import { useEffect } from 'react';
// import axiosClient from '../helpers/axiosClient';
// import Swal from 'sweetalert2';
import MyRecipeCard from '../components/MyRecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyFavoriteRecipes } from '../features/myRecipesSlice';

export default function FavoriteRecipe() {
  const recipes = useSelector((state) => state.myRecipes.favoriteRecipes.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyFavoriteRecipes());
  }, []);

  return (
    <>
      <h4 className="text-center mt-3">My Favorite Recipes</h4>
      <div className="d-flex gap-1 flex-wrap justify-content-center my-3">
        {recipes.map((recipe) => {
          return <MyRecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </>
  );
}
