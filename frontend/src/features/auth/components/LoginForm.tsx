'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLoginForm } from '../hooks/useLoginForm';
import { BaseForm } from '@/components/forms/BaseForm';
import { FormInput } from '@/components/forms/FormInput';

export function LoginForm() {
  const { formData, updateField } = useLoginForm();
  const { login, isLoading } = useAuth();
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setErrors({});

    // Validação básica
    const newErrors: {email?: string; password?: string} = {};
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
    updateField(field, value);
    
    // Limpa erros quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Financial Extract
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        {/* Usando BaseForm com maxWidth menor */}
        <BaseForm
          onSubmit={handleSubmit}
          onCancel={() => window.history.back()} // ou outra ação de cancel
          isLoading={isLoading}
          submitError={submitError}
          isEdit={false}
          maxWidth="md"
        >
          <div className="space-y-4">
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              placeholder="seu@email.com"
              required
            />

            <FormInput
              label="Senha"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              placeholder="Sua senha"
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-600">Lembrar de mim</span>
              </label>
              
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 pt-4">
            Não tem uma conta?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
              Cadastre-se
            </a>
          </div>
        </BaseForm>
      </div>
    </div>
  );
}