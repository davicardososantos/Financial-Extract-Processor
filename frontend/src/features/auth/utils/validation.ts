import { LoginFormData } from '../types/auth';

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export function validateLoginForm(data: LoginFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.email) {
    errors.email = 'Email é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email inválido';
  }

  if (!data.password) {
    errors.password = 'Senha é obrigatória';
  } else if (data.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres';
  }

  return errors;
}