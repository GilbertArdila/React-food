
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

//to avoid an infinite loop, because here we don´t use a config object, it is a GET fetch
const requestConfig = {}

const Meals = () => {

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

if(isLoading){
  return <p className="text-center">Fetching data...</p>
}
if(error){
  return <Error title='Failed to fetch meals' message={error}/>
}


  return (
    <ul className="w-full md:w-[90%] max-w-[1120px] list-none my-8 mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        { loadedMeals.map((meal) => (
          <MealItem meal={meal} key={meal.id}/>
        ))}
    </ul>
  )
}

export default Meals;