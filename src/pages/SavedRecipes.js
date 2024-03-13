import React, { useEffect, useState } from 'react';
import { useGetUserid } from '../helper/useGetUserid';
import axios from 'axios';
const SavedRecipes = () => {
  const UserId = useGetUserid();
  const [savedrecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://cautious-lingerie-tick.cyclic.app/recipe/savedRecipes/${UserId}`
        );

        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedrecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
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

export default SavedRecipes;
