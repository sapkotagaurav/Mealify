import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, Divider } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

function MealDetails() {
  const { mealId } = useParams(); // Get meal ID from URL parameter
  const [mealDetails, setMealDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [color , setColor] = useState("text-black-9000");



  const fetchMealDetails = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${MEALDB_API_URL}${mealId}`);
      setMealDetails(response.data.meals[0]); // Extract the first meal object
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchMealDetails, 2000);
    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <div className='w-lvw h-lvh'>
      {isLoading ? (
        <div className='flex flex-col justify-center items-center h-full w-full'> 
          <img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" alt="Loading" />
          <p className='text-red-400 text-center text-4xl font-bold'> Loading ... :)</p>
        </div>
      ) : error ? (
        <div className='flex flex-col justify-center items-center h-full w-full'> 
          <p className='text-red-400 text-center text-4xl font-bold'> Sorry! We Don't have recipe for that :)</p>
        </div>
        
      ) : mealDetails ? (
     
        
        <div className={`flex flex-wrap h-screen items-center ml-auto rounded-lg1 p-10`}>
          <Image className="sm:w-full sm:h-3/4 lg:w-3/6 lg:h-full rounded-lg object-cover outline" src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
          <div className={`flex lg:w-3/6 h-full sm:px-3 lg:px-10 flex-col  rounded-lg lg:overflow-y-auto`}>
            <Heading as="h2" className='sm:py-10 lg:py-0'>{mealDetails.strMeal}</Heading>
            <Divider my={4} />
            <h1 className='text-3xl font-bold text-gray-900'>Ingredients:</h1>
            <Box>
            
              {Object.entries(mealDetails)
                .filter(([key]) => key.startsWith('strIngredient'))
                .map(([ingredientKey, ingredientValue], index) => (
                  <Text className='ml-6' key={index}>{ingredientValue}</Text>
                ))}
            </Box>
            <Divider my={4} />
            
            <h1 className='text-3xl font-bold text-gray-900'>Instructions:</h1>
            <Text>{mealDetails.strInstructions}</Text>
          </div>
        </div>
    
      ) : (
        <Text>Meal details not found.</Text>
      )}
    </div>
  );
}

export default MealDetails;

// import React, { useState, useEffect } from 'react';
// import { Box, Heading, Text, Image, Divider } from '@chakra-ui/react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const MEALDB_API_URL_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';



// function MealDetails() {
//   const { mealId } = useParams();
//   const [mealDetails, setMealDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [haserror, setError] = useState(false);


//   const fetchMealDetails = () => {
//     setIsLoading(true);
//     axios.get(`${MEALDB_API_URL_DETAILS}${mealId}`).then (
//       (res) => {
//         setMealDetails(res.data.meals[0])
//         setIsLoading(false)
//       }
//     ).catch (
//       (error) => {
//         setError(true)
//       }
//     )
//   }

//   useEffect(()=>{
//     fetchMealDetails();
//   } , [])



//   return (
//     <div>
//       {
//         haserror ? (
//           <div className=''>
//             <p>Loading</p>
//           </div>
//         ) : isLoading ? (
//           <h1>Loading</h1>
//         ) : mealDetails ? (
//           <p>mealDetail</p>
//         ):(
//           <p>Detail Not Found</p>
//         )
//       }
//     </div>
//   )
// }

// export default MealDetails;