import { useState } from 'react';
import { Search, Filter, MapPin, Edit, History, AlertCircle, ChevronDown } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  reorderLevel: number;
  location: string;
  category: string;
  supplier: string;
  expiryDate: string;
  status: 'optimal' | 'low' | 'out' | 'overstocked';
}

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const products: Product[] = [
    { id: '1', name: 'Whole Milk 2L', sku: 'MILK-001', quantity: 45, reorderLevel: 50, location: 'A1-S3', category: 'Dairy', supplier: 'Daily Dairy Co', expiryDate: '2024-12-20', status: 'low' },
    { id: '2', name: 'White Bread', sku: 'BAKE-023', quantity: 120, reorderLevel: 80, location: 'B2-S1', category: 'Bakery', supplier: 'Bakery Express', expiryDate: '2024-12-18', status: 'overstocked' },
    { id: '3', name: 'Fresh Eggs (12)', sku: 'EGG-012', quantity: 0, reorderLevel: 40, location: 'A1-S5', category: 'Dairy', supplier: 'Fresh Farms Ltd', expiryDate: '2024-12-22', status: 'out' },
    { id: '4', name: 'Orange Juice 1L', sku: 'JUICE-045', quantity: 78, reorderLevel: 60, location: 'C3-S2', category: 'Beverages', supplier: 'Fresh Farms Ltd', expiryDate: '2024-12-25', status: 'optimal' },
    { id: '5', name: 'Cheddar Cheese 500g', sku: 'CHEESE-008', quantity: 32, reorderLevel: 30, location: 'A1-S7', category: 'Dairy', supplier: 'Daily Dairy Co', expiryDate: '2024-12-28', status: 'optimal' },
    { id: '6', name: 'Tomatoes (kg)', sku: 'VEG-102', quantity: 15, reorderLevel: 25, location: 'D1-S1', category: 'Produce', supplier: 'Fresh Farms Ltd', expiryDate: '2024-12-17', status: 'low' },
    { id: '7', name: 'Coca Cola 2L', sku: 'BEV-234', quantity: 156, reorderLevel: 100, location: 'C2-S4', category: 'Beverages', supplier: 'Drinks Direct', expiryDate: '2025-03-15', status: 'overstocked' },
    { id: '8', name: 'Chicken Breast (kg)', sku: 'MEAT-056', quantity: 42, reorderLevel: 35, location: 'E1-S2', category: 'Meat', supplier: 'Quality Meats', expiryDate: '2024-12-19', status: 'optimal' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-700';
      case 'low': return 'bg-yellow-100 text-yellow-700';
      case 'out': return 'bg-red-100 text-red-700';
      case 'overstocked': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stockHistory = [
    { date: '2024-12-14', action: 'Received', quantity: 50, user: 'John D.', note: 'Morning delivery' },
    { date: '2024-12-13', action: 'Sold', quantity: -23, user: 'System', note: 'Daily sales' },
    { date: '2024-12-12', action: 'Adjusted', quantity: -2, user: 'Sarah M.', note: 'Damaged items' },
    { date: '2024-12-11', action: 'Sold', quantity: -18, user: 'System', note: 'Daily sales' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name, SKU, category, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-200">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Dairy</option>
              <option>Bakery</option>
              <option>Beverages</option>
              <option>Produce</option>
              <option>Meat</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Stock Levels</option>
              <option>Optimal</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
              <option>Overstocked</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Suppliers</option>
              <option>Daily Dairy Co</option>
              <option>Bakery Express</option>
              <option>Fresh Farms Ltd</option>
              <option>Drinks Direct</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Expiry: All</option>
              <option>Expiring in 3 days</option>
              <option>Expiring in 7 days</option>
              <option>Expiring in 30 days</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-gray-900">Product Inventory ({filteredProducts.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Product</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">SKU</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Location</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{product.sku}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-gray-900">{product.quantity}</p>
                        <p className="text-xs text-gray-500">Min: {product.reorderLevel}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <MapPin className="w-3 h-3" />
                        {product.location}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="space-y-4">
          {selectedProduct ? (
            <>
              {/* Product Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-gray-900 mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Product Name</p>
                    <p className="text-gray-900">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">SKU</p>
                    <p className="text-gray-900">{selectedProduct.sku}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-600">Current Stock</p>
                      <p className="text-gray-900">{selectedProduct.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Reorder Level</p>
                      <p className="text-gray-900">{selectedProduct.reorderLevel}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="text-gray-900">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Supplier</p>
                    <p className="text-gray-900">{selectedProduct.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expiry Date</p>
                    <p className="text-gray-900">{selectedProduct.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <div className="flex items-center gap-2 text-gray-900">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {selectedProduct.location}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Update Quantity
                  </button>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Restock Request
                  </button>
                </div>
              </div>

              {/* Store Layout */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-gray-900 mb-4">Store Location</h3>
                <div className="bg-gray-100 rounded-lg p-4 aspect-square relative">
                  <div className="absolute inset-0 p-4">
                    <div className="grid grid-cols-4 gap-2 h-full">
                      {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'].map((loc) => (
                        <div
                          key={loc}
                          className={`border-2 rounded flex items-center justify-center text-xs ${
                            selectedProduct.location.startsWith(loc)
                              ? 'bg-blue-100 border-blue-500 text-blue-700'
                              : 'bg-white border-gray-300 text-gray-600'
                          }`}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock History */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-4 h-4 text-gray-600" />
                  <h3 className="text-gray-900">Stock History</h3>
                </div>
                <div className="space-y-3">
                  {stockHistory.map((entry, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`${entry.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {entry.quantity > 0 ? '+' : ''}{entry.quantity}
                          </span>
                          <span className="text-gray-600">{entry.action}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{entry.note}</p>
                        <p className="text-xs text-gray-400 mt-1">{entry.date} • {entry.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Select a product to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
