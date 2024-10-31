import { useEffect } from 'react';
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

      {recipes.length == 0 && (
        <div className="text-center">
          <img src="/no-data.png" alt="No Data" height={'200px'} />
          <p>Your favorite recipes will appear here</p>
        </div>
      )}

      <div className="d-flex gap-1 flex-wrap justify-content-center my-3">
        {recipes.map((recipe) => {
          return <MyRecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </>
  );
}
