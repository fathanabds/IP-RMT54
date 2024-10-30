import { useEffect } from 'react';
// import axiosClient from '../helpers/axiosClient';
// import Swal from 'sweetalert2';
import MyRecipeCard from '../components/MyRecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyFavoriteRecipes } from '../features/myRecipesSlice';

export default function FavoriteRecipe() {
  const recipes = useSelector((state) => state.myRecipes.favoriteRecipes.value);
  const dispatch = useDispatch();
  // const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    dispatch(fetchMyFavoriteRecipes());
  }, []);

  // async function fetchData() {
  //   try {
  //     const { data } = await axiosClient.get('/user-recipes/favorite', {
  //       headers: {
  //         Authorization: localStorage.getItem('access_token'),
  //       },
  //     });
  //     setRecipes(data);
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire(error.response.data.message);
  //   }
  // }

  return (
    <>
      <>
        <div className="d-flex gap-1 flex-wrap justify-content-center my-3">
          {recipes.map((recipe) => {
            return <MyRecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </>
    </>
  );
}
