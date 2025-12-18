import { AlertTriangle, TrendingDown, TrendingUp, Package, ShoppingCart, Truck, Plus, FileText, ClipboardList } from 'lucide-react';

export function Dashboard() {
  const stockStats = [
    { label: 'Low Stock', count: 24, color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
    { label: 'Out of Stock', count: 8, color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
    { label: 'Overstocked', count: 12, color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-50' },
    { label: 'Optimal', count: 456, color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: '15 products expiring within 3 days', time: '10 mins ago', icon: AlertTriangle, color: 'text-orange-600' },
    { id: 2, type: 'danger', message: 'Milk (SKU-1234) out of stock', time: '25 mins ago', icon: Package, color: 'text-red-600' },
    { id: 3, type: 'info', message: 'Price change pending for 8 items', time: '1 hour ago', icon: TrendingUp, color: 'text-blue-600' },
    { id: 4, type: 'warning', message: 'Delivery from Supplier A delayed', time: '2 hours ago', icon: Truck, color: 'text-orange-600' },
  ];

  const inboundItems = [
    { supplier: 'Fresh Farms Ltd', items: 45, time: '09:30 AM', status: 'Arriving' },
    { supplier: 'Daily Dairy Co', items: 28, time: '11:00 AM', status: 'Scheduled' },
    { supplier: 'Bakery Express', items: 35, time: '02:00 PM', status: 'Scheduled' },
  ];

  const outboundItems = [
    { type: 'Sales', count: 342, value: '£4,580' },
    { type: 'Returns', count: 12, value: '£156' },
    { type: 'Transfers', count: 8, value: '£245' },
  ];

  const quickActions = [
    { label: 'Add New Stock', icon: Plus, color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Generate Pick List', icon: ClipboardList, color: 'bg-green-600 hover:bg-green-700' },
    { label: 'Create Report', icon: FileText, color: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'View Orders', icon: ShoppingCart, color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stock Level Widgets */}
      <div>
        <h2 className="text-gray-900 mb-4">Stock Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stockStats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm ${stat.textColor}`}>{stat.label}</span>
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              </div>
              <div className={`${stat.textColor}`}>{stat.count}</div>
              <div className="mt-3 bg-white rounded-full h-2 overflow-hidden">
                <div className={`${stat.color} h-full`} style={{ width: `${(stat.count / 500) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Alerts & Notifications</h3>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                {alerts.length} Active
              </span>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Icon className={`w-5 h-5 mt-0.5 ${alert.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 whitespace-nowrap">
                      View
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className={`w-full ${action.color} text-white rounded-lg p-4 flex items-center gap-3 transition-colors`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Inbound/Outbound Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inbound */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <h3 className="text-gray-900">Today's Inbound Deliveries</h3>
          </div>
          <div className="space-y-3">
            {inboundItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">{item.supplier}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.items} items • {item.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  item.status === 'Arriving' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Items Expected</span>
              <span className="text-gray-900">108 items</span>
            </div>
          </div>
        </div>

        {/* Outbound */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900">Today's Outbound Summary</h3>
          </div>
          <div className="space-y-4">
            {outboundItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">{item.type}</p>
                  <p className="text-gray-900 mt-1">{item.value}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{item.count}</p>
                  <p className="text-xs text-gray-500">items</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Outbound</span>
              <span className="text-gray-900">362 items • £4,981</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
