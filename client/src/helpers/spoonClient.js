import axios from 'axios';

const spoonClient = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/findByNutrients?apiKey=04beb81397d04341bff76a96355b802f',
});

export default spoonClient;
