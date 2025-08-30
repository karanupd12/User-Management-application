import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userService } from '../services/userService';
import { User } from '../types/User';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchUser(parseInt(id));
    }
  }, [id]);

  const fetchUser = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUser = await userService.getUserById(userId);
      setUser(fetchedUser);
    } catch (err) {
      setError('Failed to load user details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => fetchUser(parseInt(id!))} />;
  }

  if (!user) {
    return <ErrorMessage message="User not found." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="db-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User #{user.id.toString().padStart(3, '0')}</h1>
            <p className="text-gray-500">Complete user record details</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to={`/edit/${user.id}`} className="db-button-primary">
              Edit User
            </Link>
            <Link to="/" className="db-button-secondary">
              Back to Database
            </Link>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="db-card">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
              <dd className="col-span-2 text-sm text-gray-900">{user.name}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="col-span-2 text-sm text-gray-900">@{user.username}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="col-span-2 text-sm">
                <a href={`mailto:${user.email}`} className="text-primary-600 hover:text-primary-800">
                  {user.email}
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="col-span-2 text-sm text-gray-900">{user.phone}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="col-span-2 text-sm">
                <a 
                  href={`http://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800"
                >
                  {user.website}
                </a>
              </dd>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="db-card">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Address Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Street</dt>
              <dd className="col-span-2 text-sm text-gray-900">{user.address.street}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Suite</dt>
              <dd className="col-span-2 text-sm text-gray-900">{user.address.suite}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">City</dt>
              <dd className="col-span-2 text-sm text-gray-900">{user.address.city}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Zip Code</dt>
              <dd className="col-span-2 text-sm text-gray-900">{user.address.zipcode}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Coordinates</dt>
              <dd className="col-span-2 text-sm text-gray-900">
                {user.address.geo.lat}, {user.address.geo.lng}
              </dd>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="db-card lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Company Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-6 gap-4">
              <dt className="text-sm font-medium text-gray-500">Company Name</dt>
              <dd className="col-span-2 text-sm text-gray-900 font-medium">{user.company.name}</dd>
              <dt className="text-sm font-medium text-gray-500">Catch Phrase</dt>
              <dd className="col-span-2 text-sm text-gray-900 italic">"{user.company.catchPhrase}"</dd>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <dt className="text-sm font-medium text-gray-500">Business</dt>
              <dd className="col-span-5 text-sm text-gray-900">{user.company.bs}</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
