import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  // We need the login function to auto-login after registering
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);

    // 1. Check Passwords
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // 2. Send Data to Backend
      const config = { headers: { 'Content-Type': 'application/json' } };
      
      console.log("Attempting to register:", { name, email, password });

      // Note: We use axios directly here instead of context for simplicity in this step
      await axios.post(
        'http://localhost:5000/api/users', 
        { name, email, password }, 
        config
      );

      // 3. Auto-Login on Success
      console.log("Registration successful. Logging in...");
      await login(email, password);
      
      // 4. Redirect will happen automatically via the Listener in LoginPage/App
      navigate('/admin');

    } catch (error) {
      console.error("Registration Error:", error);
      setMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl font-bold mb-6">Create Admin</h2>
          
          {message && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{message}</div>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text" 
              placeholder="Your Name"
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email" 
              placeholder="email@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password" 
              placeholder="********"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password" 
              placeholder="********"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">
            Register & Login
          </button>
          
          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 text-sm">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;