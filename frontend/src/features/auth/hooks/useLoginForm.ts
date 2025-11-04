'use client';

import { useState } from 'react';
import { LoginFormData } from '../types/auth';

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  return {
    formData,
    updateField,
    resetForm,
  };
}