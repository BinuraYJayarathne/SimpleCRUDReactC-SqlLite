// src/components/ContactForm.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import contactService from '../services/contactService';

function ContactForm() {
  // Get the ID from URL if we're editing an existing contact
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Determine if we're in edit mode
  const isEditMode = !!id;
  
  // State for the form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // State for loading and error handling
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // If we're editing, fetch the contact data when component mounts
  useEffect(() => {
    if (isEditMode) {
      const fetchContact = async () => {
        try {
          const data = await contactService.getContactById(id);
          setFormData({
            name: data.name,
            email: data.email,
            phone: data.phone
          });
          setError(null);
        } catch (err) {
          setError('Could not fetch contact details. Please try again.');
          console.error('Error fetching contact:', err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchContact();
    }
  }, [id, isEditMode]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    try {
      if (isEditMode) {
        // Update existing contact
        await contactService.updateContact(id, {
          id: parseInt(id),
          ...formData
        });
        alert('Contact updated successfully!');
      } else {
        // Create new contact
        await contactService.createContact(formData);
        alert('Contact created successfully!');
      }
      // Navigate back to contacts list
      navigate('/');
    } catch (err) {
      setSubmitError(`Failed to ${isEditMode ? 'update' : 'create'} contact. Please try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} contact:`, err);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="text-center py-10">Loading contact data...</div>;
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

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Contact' : 'Add New Contact'}
      </h1>
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isEditMode ? 'Update Contact' : 'Add Contact'}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;