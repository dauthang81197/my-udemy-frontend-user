import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import { authApi } from '@/api/authApi';
import { getApiErrorMessage } from '@/utils/helpers';
import type { RegisterFormValues } from '../schemas/registerSchema';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ confirmPassword: _c, ...values }: RegisterFormValues) =>
      authApi.register(values),
    onSuccess: () => {
      message.success('Account created! Please sign in.');
      navigate('/login');
    },
    onError: (error) => {
      message.error(getApiErrorMessage(error, 'Registration failed'));
    },
  });
}
