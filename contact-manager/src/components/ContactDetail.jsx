// src/components/ContactDetail.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import contactService from '../services/contactService';

function ContactDetail() {
  // Get the ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for contact details
  const [contact, setContact] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  // Fetch contact details when component mounts
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        setLoading(true);
        const data = await contactService.getContactById(id);
        setContact(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch contact details. Please try again.');
        console.error('Error fetching contact details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [id]);

  // Function to handle contact deletion
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        await contactService.deleteContact(id);
        alert(`${contact.name} has been deleted successfully.`);
        navigate('/');
      } catch (err) {
        setError('Failed to delete contact. Please try again.');
        console.error('Error deleting contact:', err);
      }
    }
  };

  // Show loading state
  if (loading) {
    return <div className="text-center py-10">Loading contact details...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p>{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Contacts
        </button>
      </div>
    );
  }

  // If contact was not found
  if (!contact) {
    return (
      <div className="text-center py-10">
        <p>Contact not found.</p>
        <Link 
          to="/"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Contacts
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white px-6 py-4">
          <h1 className="text-3xl font-bold">{contact.name}</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg">{contact.email}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600">Phone</p>
            <p className="text-lg">{contact.phone}</p>
          </div>
          
          <div className="flex space-x-2">
            <Link 
              to={`/edit/${contact.id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <Link 
              to="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetail;