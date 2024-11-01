import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMyRecipes, fetchMyFavoriteRecipes } from '../features/myRecipesSlice';

/* eslint-disable react/prop-types */
export default function MyRecipeCard({ recipe, currPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleFavorite(id) {
    try {
      await axiosClient.patch(`/user-recipes/${id}/favorite`, null, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      navigate('/favorite-recipes');
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  async function handleUnfavorite(id) {
    try {
      await axiosClient.patch(`/user-recipes/${id}/unfavorite`, null, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      navigate('/my-recipes');
      dispatch(fetchMyRecipes());
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  async function handleDelete(id) {
    try {
      await axiosClient.delete(`/user-recipes/${id}`, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      switch (currPage) {
        case 'myRecipes':
          dispatch(fetchMyRecipes());
          break;
        default:
          dispatch(fetchMyFavoriteRecipes());
          break;
      }
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  return (
    <>
      <div className="card" style={{ width: '14rem' }}>
        <img height={'165px'} src={recipe.Recipe.image} className="card-img-top" alt={recipe.Recipe.title} />
        <div className="card-body">
          <h5 className="card-title text-center" style={{ height: '95px' }}>
            {recipe.Recipe.title}
          </h5>
          <div className="d-flex flex-wrap gap-1 justify-content-around mb-2">
            <span className="card-text">Calories: {recipe.Recipe.calories}</span>
            <span className="card-text">Protein: {recipe.Recipe.protein}</span>
            <span className="card-text">Fat: {recipe.Recipe.fat}</span>
            <span className="card-text">Carbs: {recipe.Recipe.carbs}</span>
          </div>
          {recipe.favorite ? (
            <button onClick={() => handleUnfavorite(recipe.id)} className="btn btn-warning w-100 mb-1">
              Remove Favorite
            </button>
          ) : (
            <button onClick={() => handleFavorite(recipe.id)} className="btn btn-warning w-100 mb-1">
              Add Favorite
            </button>
          )}
          <button onClick={() => handleDelete(recipe.id)} className="btn btn-danger w-100">
            Delete Recipe
          </button>
        </div>
      </div>
    </>
  );
}
