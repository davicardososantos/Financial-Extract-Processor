'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bem-vindo ao Financial Extract Processor!
              </h2>
              <p className="text-gray-600 mb-8">Olá, {user?.name}! O que você gostaria de fazer?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {/* Card de Clientes */}
                <Link
                  href="/clientes"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover:bg-blue-50"
                >
                  <div className="text-3xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold mb-2">Clientes</h3>
                  <p className="text-gray-600">Gerencie seus clientes</p>
                </Link>

                {/* Card de Contas */}
                <Link
                  href="/contas"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover:bg-green-50"
                >
                  <div className="text-3xl mb-4">🏦</div>
                  <h3 className="text-xl font-semibold mb-2">Contas</h3>
                  <p className="text-gray-600">Gerencie contas bancárias</p>
                </Link>

                {/* Card de Categorias */}
                <Link
                  href="/categorias"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover:bg-purple-50"
                >
                  <div className="text-3xl mb-4">📂</div>
                  <h3 className="text-xl font-semibold mb-2">Categorias</h3>
                  <p className="text-gray-600">Organize suas transações</p>
                </Link>

                {/* Card de Cartões de Crédito (NOVO) */}
                <Link
                  href="/cartoes-credito"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover:bg-orange-50"
                >
                  <div className="text-3xl mb-4">💳</div>
                  <h3 className="text-xl font-semibold mb-2">Cartões de Crédito</h3>
                  <p className="text-gray-600">Gerencie cartões e limites</p>
                </Link>

                {/* Card de Extratos (futuro) */}
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-gray-300 text-center opacity-50">
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-2">Extratos</h3>
                  <p className="text-gray-600">Em breve</p>
                </div>

                {/* Card de Relatórios (futuro) */}
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-gray-300 text-center opacity-50">
                  <div className="text-3xl mb-4">📈</div>
                  <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
                  <p className="text-gray-600">Em breve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}