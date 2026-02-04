import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import BookManagementPage from './pages/BookManagementPage'; 
import AuthContext, { AuthProvider } from './context/AuthContext';
import './index.css'; 

// Guard: Only allows Admins to see the dashboard
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>;

  // If not logged in -> Login Page
  // If logged in but not Admin -> Login Page (which will redirect to Store)
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <BookManagementPage /> 
              </AdminRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;