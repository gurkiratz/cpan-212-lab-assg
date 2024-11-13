import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/api/recipe")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error(error));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:8001/api/recipe/${id}`, { method: "DELETE" })
      .then(() => setRecipes(recipes.filter((recipe) => recipe._id !== id)))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>All Recipes</h1>
      <Link to="/recipes/new">Add New Recipe</Link>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
            <Link to={`/recipes/${recipe._id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
