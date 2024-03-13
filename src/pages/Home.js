import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserid } from '../helper/useGetUserid';
import { useCookies } from 'react-cookie';

const Home = () => {
  const UserId = useGetUserid();
  const [cookies] = useCookies(['access_token']);
  const [recipes, setRecipes] = useState([]);
  const [savedrecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          'https://cautious-lingerie-tick.cyclic.app/recipe'
        );
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://cautious-lingerie-tick.cyclic.app/recipe/savedRecipes/ids/${UserId}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, []);
  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        'https://cautious-lingerie-tick.cyclic.app/recipe',
        {
          recipeId,
          UserId,
        },
        { headers: { authorization: cookies.access_token } }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const isRecipeSaved = (id) => savedrecipes.includes(id);
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {cookies.access_token && (
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
                </button>
              )}
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time : {recipe.cookingTime} (minutes)</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
