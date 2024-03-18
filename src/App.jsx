import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage'
import MealDetails from './Components/MealDetails';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meals/:mealId" element={<MealDetails />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
