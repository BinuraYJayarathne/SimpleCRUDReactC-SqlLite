// src/components/ContactList.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contactService from '../services/contactService';

function ContactList() {
  // State to store the list of contacts
  const [contacts, setContacts] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // Fetch contacts when component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  // Function to fetch all contacts from the API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAllContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts. Please try again later.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle contact deletion
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await contactService.deleteContact(id);
        // Refresh the contact list after deletion
        fetchContacts();
        alert(`${name} has been deleted successfully.`);
      } catch (err) {
        setError('Failed to delete contact. Please try again.');
        console.error('Error deleting contact:', err);
      }
    }
  };

  // Show loading state
  if (loading) {
    return <div className="text-center py-10">Loading contacts...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p>{error}</p>
        <button 
          onClick={fetchContacts}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Contact List</h1>
      
      {contacts.length === 0 ? (
        <div className="text-center py-10">
          <p>No contacts found. Add your first contact!</p>
          <Link 
            to="/add" 
            className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Contact
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map(contact => (
            <div 
              key={contact.id} 
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{contact.name}</h2>
              <p className="text-gray-600 mt-1">{contact.email}</p>
              <p className="text-gray-600">{contact.phone}</p>
              
              <div className="mt-4 flex space-x-2">
                <Link 
                  to={`/view/${contact.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  View
                </Link>
                <Link 
                  to={`/edit/${contact.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(contact.id, contact.name)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;