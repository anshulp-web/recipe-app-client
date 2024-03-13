import React, { useState } from 'react';
import axios from 'axios';
import { useGetUserid } from '../helper/useGetUserid';
import { useNavigate } from 'react-router-dom';
const CreateRecipe = () => {
  const userId = useGetUserid();
  const [recipe, setRecipe] = useState({
    name: '',
    ingrediants: [],
    imageUrl: '',
    cookingTime: 0,
    ownerId: userId,
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingrediants = recipe.ingrediants;
    ingrediants[index] = value;
    setRecipe({ ...recipe, ingrediants });
  };
  const addIngredient = () => {
    setRecipe({ ...recipe, ingrediants: [...recipe.ingrediants, ''] });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://cautious-lingerie-tick.cyclic.app/recipe/save',
        recipe
      );
      alert('Recipe Created Successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingrediants">Ingredients</label>
        {recipe.ingrediants.map((ingrediant, index) => (
          <input
            key={index}
            type="text"
            name="ingrediants"
            value={ingrediant}
            onChange={(event) => handleIngredientChange(event, index)}
            style={{ marginBottom: '5px' }}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          type="text"
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />

        <label htmlFor="name">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
