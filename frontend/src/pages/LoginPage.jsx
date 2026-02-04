import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, error } = useContext(AuthContext); 
  const navigate = useNavigate();

  // --- TRAFFIC COP LOGIC ---
  useEffect(() => {
    if (user) {
      if (user.isAdmin === true) {
        console.log("✅ Admin Detected: Going to Dashboard");
        navigate('/admin');
      } else {
        console.log("👤 Customer Detected: Redirecting to Storefront...");
        // This jumps out of the Admin App to your Consumer App
        window.location.href = 'http://localhost:5173'; 
      }
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl font-bold mb-6">Admin Portal</h2>
          
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">
            Sign In
          </button>
          
          <div className="text-center mt-4">
            <Link to="/register" className="text-blue-500 text-sm">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;