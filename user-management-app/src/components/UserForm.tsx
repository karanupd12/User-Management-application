import React, { useState, useEffect } from 'react';
import { User, CreateUserData } from '../types/User';

interface UserFormProps {
  user?: User;
  onSubmit: (userData: CreateUserData) => void;
  isSubmitting?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        website: user.website,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="db-card">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-medium text-gray-900">
          {user ? `Edit User #${user.id.toString().padStart(3, '0')}` : 'Add New User'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {user ? 'Update user information in the database' : 'Enter user details to create a new record'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="db-label">
              Full Name <span className="text-danger-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="db-input"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="db-label">
              Username <span className="text-danger-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="db-input"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="db-label">
              Email Address <span className="text-danger-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="db-input"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="db-label">
              Phone Number <span className="text-danger-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="db-input"
              placeholder="Enter phone number"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="website" className="db-label">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="db-input"
              placeholder="Enter website URL (optional)"
            />
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="db-button-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="db-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              user ? 'Update User' : 'Create User'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
