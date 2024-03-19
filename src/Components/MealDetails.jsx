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
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
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

    

    fetchMealDetails();
  }, [mealId]);

  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  console.log(screenHeight)

  return (
    <div className='w-lvw h-lvh'>
      {isLoading ? (
        <Text>Loading meal details...</Text>
      ) : error ? (
        <Text color="red.500">Error fetching meal details: {error.message}</Text>
      ) : mealDetails ? (
     
        
        <div className={`flex flex-wrap h-screen items-center ml-auto rounded-lg1 p-10`}>

          <Image className="sm:w-full sm:h-3/4 lg:w-3/6 lg:h-full rounded-lg object-cover outline" src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
          <div className={`flex lg:w-3/6 h-full px-10 flex-col  rounded-lg lg:overflow-y-auto`}>
            <Heading as="h2" className='sm:py-10 lg:py-0'>{mealDetails.strMeal}</Heading>
            <Divider my={4} />
            <h1 className='text-3xl font-bold text-gray-900'>Ingredients:</h1>
            <Box>
              {Object.entries(mealDetails)
                .filter(([key]) => key.startsWith('strIngredient') && mealDetails[key])
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
