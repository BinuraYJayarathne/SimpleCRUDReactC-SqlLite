// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetail from './components/ContactDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-6">
          <Routes>
            {/* Home route - Show all contacts */}
            <Route path="/" element={<ContactList />} />
            
            {/* Add new contact */}
            <Route path="/add" element={<ContactForm />} />
            
            {/* View contact details */}
            <Route path="/view/:id" element={<ContactDetail />} />
            
            {/* Edit existing contact */}
            <Route path="/edit/:id" element={<ContactForm />} />
            
            {/* Fallback for any other routes */}
            <Route path="*" element={
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold">Page Not Found</h2>
                <p className="mt-2">The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;