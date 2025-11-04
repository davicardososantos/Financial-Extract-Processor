'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../features/auth/lib/authService';
import { User } from '../features/auth/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação ao inicializar
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    
    try {
      // Verifica se o token é válido antes de setar o usuário
      const isValid = await authService.verificarTokenValido();
      
      if (isValid) {
        const savedUser = authService.getUser();
        if (savedUser) {
          setUser(savedUser);
        } else {
          authService.logout();
        }
      } else {
        authService.logout();
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Usa o AuthService para fazer login real
      const loginResponse = await authService.login({ 
        email, 
        password 
      });
      
      setUser(loginResponse.user);
      
    } catch (error) {
      // Limpa estado em caso de erro
      authService.logout();
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}