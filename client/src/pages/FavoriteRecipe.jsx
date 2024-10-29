export default function FavoriteRecipe() {
  return (
    <>
      <div className="d-flex gap-1 flex-wrap justify-content-center my-3">
        <div className="card" style={{ width: '14rem' }}>
          <img height={'165px'} src={'https://img.spoonacular.com/recipes/1697687-312x231.jpg'} className="card-img-top" alt="Spinach Mushroom Omelette with Parmesan" />
          <div className="card-body">
            <h5 className="card-title text-center">Spinach Mushroom Omelette with Parmesan</h5>
            <div className="d-flex flex-wrap gap-1 justify-content-around mb-2">
              <span className="card-text">Calories: 464</span>
              <span className="card-text">Protein: 17g</span>
              <span className="card-text">Fat: 17g</span>
              <span className="card-text">Carbs: 4g</span>
            </div>
            <button className="btn btn-warning w-100 mb-1">Remove Favorite</button>
            <button className="btn btn-danger w-100">Delete Recipe</button>
          </div>
        </div>
      </div>
    </>
  );
}
