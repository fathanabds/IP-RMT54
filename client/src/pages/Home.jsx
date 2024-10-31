import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import Swal from 'sweetalert2';
import spoonClient from '../helpers/spoonClient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyRecipes } from '../features/myRecipesSlice';
import { GridLoader } from 'react-spinners';

export default function Home() {
  const myRecipes = useSelector((state) => state.myRecipes.recipes.value);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    minCalories: '',
    maxCalories: '',
  });

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    dispatch(fetchMyRecipes());
  }, []);

  useEffect(() => {
    fetchRecipes(form);
  }, [form]);

  async function fetchRecipes(form) {
    try {
      if (form.minCalories || form.maxCalories) {
        setLoading(true);
        const { data } = await spoonClient.get(null, {
          params: {
            minCalories: form.minCalories || null,
            maxCalories: form.maxCalories || null,
          },
        });
        setRecipes(data);
        setLoading(false);
      }
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
        <h5 className="text-center">
          Let Us Know Your <span className="text-primary">Calorie</span> Needs
        </h5>
        <div className="input-group ">
          <input value={form.minCalories} onChange={handleSearch} name="minCalories" type="number" className="form-control" placeholder="Minimum calories: 50" />
          <span className="input-group-text">to</span>
          <input value={form.maxCalories} onChange={handleSearch} name="maxCalories" type="number" className="form-control" placeholder="Maximum calories: 800" />
        </div>
        <div className="d-flex align-items-center justify-content-center my-3">
          <GridLoader color={'#0B5ED7'} loading={loading} size={35} />
        </div>
      </div>

      {recipes.length == 0 && (
        <div className="text-center">
          <img src="/welcome-back.png" alt="No Data" height={'200px'} />
          <p className="mt-3">Search recipes by your calorie needs</p>
        </div>
      )}

      <div className="d-flex gap-2 flex-wrap my-3 justify-content-center">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} myRecipes={myRecipes} />;
        })}
      </div>
    </>
  );
}
