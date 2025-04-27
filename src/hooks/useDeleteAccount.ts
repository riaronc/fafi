import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useDeleteAccount() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  const deleteAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      const response = await axios.delete(`/api/accounts/${accountId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Account deleted successfully');
      setIsConfirmOpen(false);
      setAccountToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
      setIsConfirmOpen(false);
      setAccountToDelete(null);
    },
    onSettled: () => {
      setIsDeleting(false);
    }
  });

  const confirmDelete = (accountId: string) => {
    setAccountToDelete(accountId);
    setIsConfirmOpen(true);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setAccountToDelete(null);
  };

  const executeDelete = () => {
    if (accountToDelete) {
      setIsDeleting(true);
      deleteAccountMutation.mutate(accountToDelete);
    }
  };

  return {
    isDeleting,
    isConfirmOpen,
    accountToDelete,
    confirmDelete,
    cancelDelete,
    executeDelete
  };
} 