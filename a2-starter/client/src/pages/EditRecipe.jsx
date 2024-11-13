import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    difficulty: '',
    ingredients: [],
    steps: []
  });

  useEffect(() => {
    fetch(`http://localhost:8001/api/recipe/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error(error));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:8001/api/recipe/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then(() => navigate(`/recipes/${id}`))
      .catch(error => console.error(error));
  }

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for name, description, difficulty, ingredients, steps */}
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default RecipeEdit;
