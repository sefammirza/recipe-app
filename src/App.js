import { db } from "./firebase.config";
import { useState, useEffect } from "react";
import {collection, onSnapshot} from "firebase/firestore"


function App() {

  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState({
    title:"",
    desc:"",
    ingredients:[],
    steps:[]
  })

  const [popupActive, setPopupActive] = useState(false)

  const recipesCollectionRef = collection(db, "recipes")

  useEffect(() => {
    onSnapshot(recipesCollectionRef, snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewing:false,
          ...doc.data()
        }
      }))
    })
  }, [])

  const handleView = id => {
    const recipesClone = [...recipes]
    recipesClone.forEach(recipe => {
    if (recipe.id === id){
      recipe.viewing = !recipe.viewing
    }else {
      recipe.viewing = false
    }})
    setRecipes(recipesClone)
  }

  return (
    <div className="App">
     <h1>Recipe App</h1>

     <button>Add recipe</button>

    <div className="recipes">
      {recipes.map((recipe, i) => (
        <div className="recipe" key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p dangerouslySetInnerHTML={{ __html:recipe.desc}}></p>
         {recipe.viewing &&  <div>
        <h4>Ingredients</h4>
        <ul>

          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
        <h4>Steps</h4>
        <ol>
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        </div>}

        <div className="buttons">
          <button onClick={() => handleView(recipe.id)}>View {recipe.viewing ? 'less' : 'more'}</button>
          <button className="remove">Remove</button>
        </div>
        </div>
      ))}

    </div>
    </div>
  );
}

export default App;
