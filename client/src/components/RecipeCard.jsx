import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
export default function RecipeCard({ recipe, myRecipes }) {
  const navigate = useNavigate();

  async function handleAddRecipe() {
    console.log(recipe);
    console.log(myRecipes);

    try {
      const isDuplicate = myRecipes.find((e) => {
        return e.Recipe.title == recipe.title;
      });
      if (isDuplicate) {
        throw { name: 'DuplicateRecipe' };
      }
      await axiosClient.post('/user-recipes', recipe, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      navigate('/my-recipes');
    } catch (error) {
      console.log(error);
      if (error.name == 'DuplicateRecipe') {
        return Swal.fire("This recipe's already on your list");
      }
      Swal.fire(error.response.data.message);
    }
  }

  return (
    <div className="card" style={{ width: '14rem' }}>
      <img height={'165px'} src={recipe.image} className="card-img-top" alt={recipe.title} />
      <div className="card-body">
        <h5 className="card-title text-center" style={{ height: '75px' }}>
          {recipe.title}
        </h5>
        <div className="d-flex flex-wrap gap-1 justify-content-around mb-2">
          <span className="card-text">Calories: {recipe.calories}</span>
          <span className="card-text">Protein: {recipe.protein}</span>
          <span className="card-text">Fat: {recipe.fat}</span>
          <span className="card-text">Carbs: {recipe.carbs}</span>
        </div>
        <button onClick={handleAddRecipe} className="btn btn-primary w-100">
          Add to My Recipe
        </button>
      </div>
    </div>
  );
}
