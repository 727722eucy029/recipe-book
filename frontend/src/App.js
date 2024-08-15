import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Firstpg from './Components/FirstPage/Firstpg';
import ViewRecipe from './Components/ViewRecipe/ViewRecipe';
import AddRecipe from './Components/AddRecipe/AddRecipe';
import './App.css';
import Validation from './Components/Validation/Validation';
import AdmLogin from './Components/Validation/AdmLogin';
import Login from './Components/AddRecipe/Login';
import Signup from './Components/AddRecipe/Signup';
import Breakfast from './Components/ViewRecipe/Breakfast/Breakfast';
import Lunch from './Components/ViewRecipe/Lunch/Lunch';
import Snacks from './Components/ViewRecipe/Desserts/Snacks';
import Beverages from './Components/ViewRecipe/Beverages/Dinner';
import Mainpg from './Components/ViewRecipe/Breakfast/Mainpg';
import SearchPage from './Components/ViewRecipe/SearchPage'; // Import SearchPage
import Appbar from './Components/ViewRecipe/Appbar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div style={{ textAlign: 'center', backgroundColor: '#f8f9fa', padding: '20px' }}>
        <AppbarWrapper onSearch={handleSearch} searchQuery={searchQuery} />
        <Routes>
          <Route path="/" element={<Firstpg />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ViewRecipe" element={<ViewRecipe />} />
          <Route path="/AddRecipe" element={<AddRecipe />} />
          <Route path="/recipe/breakfast" element={<Breakfast />} />
          <Route path="/recipe/Mainpg" element={<Mainpg />} />
          <Route path="/recipe/lunch" element={<Lunch />} />
          <Route path="/Validation" element={<Validation />} />
          <Route path="/AdmLogin" element={<AdmLogin />} />
          <Route path="/recipe/snacks" element={<Snacks />} />
          <Route path="/recipe/dinner" element={<Beverages />} />
          <Route path="/search" element={<SearchPage searchQuery={searchQuery} />} /> {/* Pass searchQuery */}
        </Routes>
      </div>
    </Router>
  );
}

function AppbarWrapper({ onSearch, searchQuery }) {
  const location = useLocation();
  const showAppbar = !['/', '/Login', '/Signup','/AdmLogin'].includes(location.pathname);

  return showAppbar ? <Appbar onSearch={onSearch} searchQuery={searchQuery} /> : null;
}

export default App;
