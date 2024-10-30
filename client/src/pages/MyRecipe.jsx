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
      <div className="d-flex gap-1 flex-wrap justify-content-center my-3">
        {recipes.map((recipe) => {
          return <MyRecipeCard key={recipe.id} recipe={recipe} currPage={'myRecipes'} />;
        })}
      </div>
    </>
  );
}
