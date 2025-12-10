import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';
import type { AuthResponse } from '../types';

interface RegisterData {
    fullName: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export function useRegister() {
    const navigate = useNavigate();
    const { login } = useAuth();

    return useMutation({
        mutationFn: async (data: RegisterData) => {
            const response = await api.post<AuthResponse>('/auth/register', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.user, data.token);
            navigate('/products');
        },
    });
}

export function useLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();

    return useMutation({
        mutationFn: async (data: LoginData) => {
            const response = await api.post<AuthResponse>('/auth/login', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.user, data.token);
            navigate('/products');
        },
    });
}

export function useLogout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return () => {
        logout();
        navigate('/signin');
    };
}
