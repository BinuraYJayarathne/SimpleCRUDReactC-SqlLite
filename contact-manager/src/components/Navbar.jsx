// src/components/Navbar.jsx

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Contact Manager</Link>
        <div>
          <Link to="/" className="px-4 py-2 hover:underline">Contacts</Link>
          <Link to="/add" className="bg-blue-500 ml-2 px-4 py-2 rounded hover:bg-blue-400">
            Add Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;