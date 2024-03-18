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

  return (
    <Box p={4}>
      {isLoading ? (
        <Text>Loading meal details...</Text>
      ) : error ? (
        <Text color="red.500">Error fetching meal details: {error.message}</Text>
      ) : mealDetails ? (
        <>
          <Heading as="h2">{mealDetails.strMeal}</Heading>
          <Image src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
          <Divider my={4} />
          <Text as="h3">Ingredients:</Text>
          <Box>
            {Object.entries(mealDetails)
              .filter(([key]) => key.startsWith('strIngredient') && mealDetails[key])
              .map(([ingredientKey, ingredientValue], index) => (
                <Text key={index}>{ingredientValue}</Text>
              ))}
          </Box>
          <Divider my={4} />
          <Text as="h3">Instructions:</Text>
          <Text>{mealDetails.strInstructions}</Text>
        </>
      ) : (
        <Text>Meal details not found.</Text>
      )}
    </Box>
  );
}

export default MealDetails;
