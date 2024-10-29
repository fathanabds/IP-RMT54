import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';

export default function MyRecipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      await axiosClient.delete(`/user-recipes/${id}`, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      fetchData();
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  async function fetchData() {
    try {
      const { data } = await axiosClient.get('/user-recipes', {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      setRecipes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  return (
    <>
      <div className="d-flex gap-1 flex-wrap justify-content-center my-3">
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id} className="card" style={{ width: '14rem' }}>
              <img height={'165px'} src={recipe.Recipe.image} className="card-img-top" alt={recipe.Recipe.title} />
              <div className="card-body">
                <h5 className="card-title text-center">{recipe.Recipe.title}</h5>
                <div className="d-flex flex-wrap gap-1 justify-content-around mb-2">
                  <span className="card-text">Calories: {recipe.Recipe.calories}</span>
                  <span className="card-text">Protein: {recipe.Recipe.protein}</span>
                  <span className="card-text">Fat: {recipe.Recipe.fat}</span>
                  <span className="card-text">Carbs: {recipe.Recipe.carbs}</span>
                </div>
                <button className="btn btn-warning w-100 mb-1">Add Favorite</button>
                <button onClick={() => handleDelete(recipe.id)} className="btn btn-danger w-100">
                  Delete Recipe
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
