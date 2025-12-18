import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar, TrendingUp, TrendingDown, Package, DollarSign, AlertTriangle } from 'lucide-react';

export function Reports() {
  const [reportPeriod, setReportPeriod] = useState ('daily');

  const salesData = [
    { day: 'Mon', sales: 4200, items: 342 },
    { day: 'Tue', sales: 3800, items: 298 },
    { day: 'Wed', sales: 5100, items: 425 },
    { day: 'Thu', sales: 4600, items: 381 },
    { day: 'Fri', sales: 6200, items: 512 },
    { day: 'Sat', sales: 7800, items: 658 },
    { day: 'Sun', sales: 5900, items: 489 },
  ];

  const categoryData = [
    { name: 'Dairy', value: 28, color: '#3b82f6' },
    { name: 'Bakery', value: 22, color: '#10b981' },
    { name: 'Beverages', value: 18, color: '#f59e0b' },
    { name: 'Produce', value: 15, color: '#ef4444' },
    { name: 'Meat', value: 12, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const stockTurnoverData = [
    { month: 'Jul', turnover: 4.2 },
    { month: 'Aug', turnover: 4.5 },
    { month: 'Sep', turnover: 3.8 },
    { month: 'Oct', turnover: 4.7 },
    { month: 'Nov', turnover: 5.1 },
    { month: 'Dec', turnover: 5.3 },
  ];

  const topProducts = [
    { name: 'Whole Milk 2L', sold: 456, revenue: '£684', trend: 'up' },
    { name: 'White Bread', sold: 389, revenue: '£467', trend: 'up' },
    { name: 'Coca Cola 2L', sold: 342, revenue: '£512', trend: 'down' },
    { name: 'Fresh Eggs (12)', sold: 298, revenue: '£596', trend: 'up' },
    { name: 'Chicken Breast', sold: 267, revenue: '£1,068', trend: 'up' },
  ];

  const performanceMetrics = [
    { label: 'Total Sales', value: '£38,600', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Items Sold', value: '3,105', change: '+8.3%', trend: 'up', icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Wastage', value: '£420', change: '-5.2%', trend: 'down', icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'Stock Turnover', value: '5.3x', change: '+0.4x', trend: 'up', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  const supplierPerformance = [
    { name: 'Fresh Farms Ltd', deliveries: 24, onTime: 96, quality: 98 },
    { name: 'Daily Dairy Co', deliveries: 18, onTime: 94, quality: 97 },
    { name: 'Bakery Express', deliveries: 22, onTime: 91, quality: 95 },
    { name: 'Quality Meats', deliveries: 15, onTime: 100, quality: 99 },
    { name: 'Drinks Direct', deliveries: 12, onTime: 88, quality: 92 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-gray-900">Performance Reports</h2>
            <p className="text-sm text-gray-500 mt-1">Analyze store performance and make data-driven decisions</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={index} className={`${metric.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-6 h-6 ${metric.color}`} />
                <span className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendIcon className="w-4 h-4" />
                  {metric.change}
                </span>
              </div>
              <div className={`text-gray-900`}>{metric.value}</div>
              <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Weekly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales (£)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stock Turnover Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Stock Turnover Rate (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockTurnoverData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="turnover" fill="#10b981" name="Turnover Rate" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sold} units sold</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">{product.revenue}</span>
                  {product.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Supplier Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-2 text-xs text-gray-600">Supplier</th>
                  <th className="text-center py-2 text-xs text-gray-600">Deliveries</th>
                  <th className="text-center py-2 text-xs text-gray-600">On-Time %</th>
                  <th className="text-center py-2 text-xs text-gray-600">Quality %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {supplierPerformance.map((supplier, index) => (
                  <tr key={index}>
                    <td className="py-3 text-sm text-gray-900">{supplier.name}</td>
                    <td className="py-3 text-sm text-gray-700 text-center">{supplier.deliveries}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supplier.onTime >= 95 ? 'bg-green-100 text-green-700' :
                        supplier.onTime >= 90 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {supplier.onTime}%
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supplier.quality >= 95 ? 'bg-green-100 text-green-700' :
                        supplier.quality >= 90 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {supplier.quality}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Custom Report Builder</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Report Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Sales Analysis</option>
              <option>Stock Movement</option>
              <option>Wastage Report</option>
              <option>Staff Activity</option>
              <option>Supplier Comparison</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Time Period</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Format</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
