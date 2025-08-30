import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';
import { CreateUserData } from '../types/User';
import UserForm from '../components/UserForm';

const CreateUserPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreateUser = async (userData: CreateUserData) => {
    try {
      setIsSubmitting(true);
      await userService.createUser(userData);
      toast.success('User created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <UserForm onSubmit={handleCreateUser} isSubmitting={isSubmitting} />
    </div>
  );
};

export default CreateUserPage;
