import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileList from './ui/ProfileList/ProfileList';
import ProfileDetails from './ui/ProfileDetails/ProfileDetails';
import BasicTabs from './components/Navbar';
import Dashboard from './ui/Dashboard/Dashboard';
import Login from './ui/Login/Login';
import { Provider } from 'react-redux'
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <BasicTabs />
        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;