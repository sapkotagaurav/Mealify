import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, Heading, Text, Card, CardHeader, CardBody, Image } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1352/randomselection.php';

const HomePage = ()=> {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(MEALDB_API_URL);
        setMeals(response.data.meals);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setFilteredMeals(
      meals.filter((meal) => meal.strMeal.toLowerCase().includes(searchTerm))
    );
  };

  const displayMeals = filteredMeals.length > 0 ? filteredMeals : meals;

  return (
    <Box p={4}>
      <Flex mb={4}>
        <Heading as="h2">Meal Explorer</Heading>
        <Box ml="auto">
          <Input placeholder="Search Meals" value={searchTerm} onChange={handleSearch} />
          <Button ml={2}>Search</Button>
        </Box>
      </Flex>

      {isLoading ? (
        <Text>Loading meals...</Text>
      ) : error ? (
        <Text color="red.500">Error fetching meals: {error.message}</Text>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
          {displayMeals.map((meal) => (
            <Link key={meal.idMeal} to={`/meals/${meal.idMeal}`}>
              <Card>
                <CardHeader>{meal.strMeal}</CardHeader>
                <CardBody>
                  <Image src={meal.strMealThumb} alt={meal.strMeal} />
                </CardBody>
              </Card>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );



}

export default HomePage;