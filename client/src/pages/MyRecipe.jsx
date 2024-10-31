import { useEffect } from 'react';
import MyRecipeCard from '../components/MyRecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyRecipes } from '../features/myRecipesSlice';

export default function MyRecipe() {
  const recipes = useSelector((state) => state.myRecipes.recipes.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyRecipes());
  }, []);

  return (
    <>
      <h4 className="text-center mt-3">My Recipes</h4>

      {recipes.length == 0 && (
        <div className="text-center">
          <img src="/no-data.png" alt="No Data" height={'200px'} />
          <p className="mx-auto text-bg-secondary rounded border w-50">Your recipes will appear here</p>
        </div>
      )}

      <div className="d-flex gap-1 flex-wrap justify-content-center my-3">
        {recipes.map((recipe) => {
          return <MyRecipeCard key={recipe.id} recipe={recipe} currPage={'myRecipes'} />;
        })}
      </div>
    </>
  );
}
