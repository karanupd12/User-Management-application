import toast from 'react-hot-toast';

interface ConfirmOptions {
  message: string;
  onConfirm: () => Promise<void> | void;
}

export const useToastConfirm = () => {
  const confirm = ({ message, onConfirm }: ConfirmOptions) => {
    if (window.confirm(message)) {
      const promise = Promise.resolve(onConfirm());
      
      toast.promise(promise, {
        loading: 'Deleting user...',
        success: 'User deleted successfully!',
        error: 'Failed to delete user. Please try again.',
      });
      
      return promise;
    }
  };

  return { confirm };
};
