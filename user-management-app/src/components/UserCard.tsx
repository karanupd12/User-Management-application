import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, isDeleting }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete(user.id);
    }
  };

  return (
    <div className="vintage-card p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-earth-800">{user.name}</h3>
        <span className="text-sm text-earth-500">#{user.id}</span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-earth-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <span className="text-sm">{user.email}</span>
        </div>
        
        <div className="flex items-center text-earth-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm">{user.phone}</span>
        </div>
        
        <div className="flex items-center text-earth-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{user.address.city}</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Link
          to={`/user/${user.id}`}
          className="vintage-button-primary flex-1 text-center"
        >
          View Details
        </Link>
        
        <Link
          to={`/edit/${user.id}`}
          className="vintage-button-secondary flex-1 text-center"
        >
          Edit
        </Link>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="vintage-button-danger flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
