import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = ({ cartCount }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 1. Create a state to control the dropdown
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsOpen(false); // Close menu
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Enchanted Quill</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart <span className="badge bg-secondary">{cartCount}</span>
              </Link>
            </li>

            {user ? (
              // 2. React-Controlled Dropdown
              <li className="nav-item dropdown">
                <span 
                  className="nav-link dropdown-toggle" 
                  role="button" 
                  style={{ cursor: 'pointer' }} // Makes it look clickable
                  onClick={() => setIsOpen(!isOpen)} // Toggle the state
                >
                  Hello, {user.name}
                </span>
                
                {/* 3. Manually add 'show' class if isOpen is true */}
                <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={{ right: 0, left: 'auto' }}>
                  <li>
                    <Link 
                      className="dropdown-item" 
                      to="/orders"
                      onClick={() => setIsOpen(false)} // Close when clicked
                    >
                      My Orders
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;