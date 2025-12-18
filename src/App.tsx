import { useState } from 'react';
import { Dashboard } from './components/dashboard';
import { Inventory } from './components/inventory';
import { Communication } from './components/communication';
import { Reports } from './components/report';
import { LayoutDashboard, Package, MessageSquare, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">SuperMarket IMS</h1>
              <p className="text-sm text-gray-500 mt-1">Inventory Management System</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-900">Manager User</p>
                <p className="text-xs text-gray-500">manager@store.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                MU
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-6 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'inventory' && <Inventory />}
        {activeTab === 'communication' && <Communication />}
        {activeTab === 'reports' && <Reports />}
      </main>
    </div>
  );
}
