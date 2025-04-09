// src/services/contactService.js

import axios from 'axios';

// Base URL for our API
const API_URL = 'http://localhost:5045/api/contacts'; // Adjust if your API is on a different port

// Create an axios instance for our API calls
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Service for handling all contact-related API calls
 */
const contactService = {
  /**
   * Get all contacts
   * @returns {Promise} Promise containing all contacts
   */
  getAllContacts: async () => {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  /**
   * Get a contact by ID
   * @param {number} id Contact ID
   * @returns {Promise} Promise containing contact data
   */
  getContactById: async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new contact
   * @param {Object} contactData Contact information
   * @returns {Promise} Promise containing the created contact
   */
  createContact: async (contactData) => {
    try {
      const response = await apiClient.post('/', contactData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  /**
   * Update an existing contact
   * @param {number} id Contact ID
   * @param {Object} contactData Updated contact information
   * @returns {Promise} Promise containing the updated contact
   */
  updateContact: async (id, contactData) => {
    try {
      const response = await apiClient.put(`/${id}`, contactData);
      return response.data;
    } catch (error) {
      console.error(`Error updating contact with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a contact
   * @param {number} id Contact ID to delete
   * @returns {Promise} Promise resolving on successful deletion
   */
  deleteContact: async (id) => {
    try {
      await apiClient.delete(`/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting contact with ID ${id}:`, error);
      throw error;
    }
  }
};

export default contactService;