'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Financial Extract
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            
            <Link
              href="/clientes"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/clientes') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Clientes
            </Link>
            
            <Link
              href="/contas"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contas') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contas
            </Link>
            
            <Link
              href="/categorias"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/categorias') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Categorias
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}