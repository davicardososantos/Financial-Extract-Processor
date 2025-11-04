'use client';

export function TestEnv() {
  return (
    <div>
      <p>API_URL: {process.env.PUBLIC_API_URL}</p>
      <p>Fallback: {process.env.PUBLIC_API_URL || 'http://localhost:8000'}</p>
    </div>
  );
}