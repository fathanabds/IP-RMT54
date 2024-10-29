import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import Swal from 'sweetalert2';
import spoonClient from '../helpers/spoonClient';

export default function Home() {
  const [form, setForm] = useState({
    minCalories: '',
    maxCalories: '',
  });

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    try {
      const { data } = await spoonClient.get('/recipes');
      setRecipes(data);
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  function handleSearch(e) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <>
      <div className="my-3 w-50 mx-auto">
        <h5 className="text-center">Let Us Know Your Calorie Needs</h5>
        <div className="input-group ">
          <input value={form.minCalories} onChange={handleSearch} name="minCalories" type="number" className="form-control" placeholder="Minimum calories: 50" />
          <span className="input-group-text">to</span>
          <input value={form.maxCalories} onChange={handleSearch} name="maxCalories" type="number" className="form-control" placeholder="Maximum calories: 800" />
        </div>
      </div>

      <div className="d-flex gap-2 flex-wrap my-3 justify-content-center">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </>
  );
}
