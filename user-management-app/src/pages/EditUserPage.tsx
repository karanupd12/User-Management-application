import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';
import { User, CreateUserData } from '../types/User';
import UserForm from '../components/UserForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setError('Failed to load user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userData: CreateUserData) => {
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      await userService.updateUser(user.id, userData);
      toast.success('User updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update user. Please try again.');
    } finally {
      setIsSubmitting(false);
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
    <div>
      <UserForm 
        user={user} 
        onSubmit={handleUpdateUser} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
};

export default EditUserPage;
