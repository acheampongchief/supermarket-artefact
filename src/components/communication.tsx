import { useState } from 'react';
import { Send, Paperclip, Users, Megaphone, Truck, Package, AlertCircle, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
  attachment?: string;
}

export function Communication() {
  const [selectedChat, setSelectedChat] = useState('team');
  const [messageInput, setMessageInput] = useState('');

  const chats = [
    { id: 'team', name: 'Store Team', unread: 3, online: 8 },
    { id: 'stockroom', name: 'Stockroom Staff', unread: 1, online: 4 },
    { id: 'managers', name: 'Managers', unread: 0, online: 2 },
    { id: 'checkout', name: 'Checkout Team', unread: 0, online: 6 },
  ];

  const messages: Message[] = [
    { id: '1', sender: 'John Smith', content: 'Morning delivery arrived early. Need help unloading at bay 2.', time: '08:15 AM', isOwn: false },
    { id: '2', sender: 'You', content: 'On my way. Be there in 5 minutes.', time: '08:16 AM', isOwn: true },
    { id: '3', sender: 'Sarah Martinez', content: 'Can someone check dairy section? Customer reported low milk stock.', time: '08:45 AM', isOwn: false },
    { id: '4', sender: 'You', content: 'I\'ll handle it. Moving stock from storage now.', time: '08:47 AM', isOwn: true },
    { id: '5', sender: 'Mike Johnson', content: 'Price labels for aisle 3 are ready. Attaching the list.', time: '09:12 AM', isOwn: false, attachment: 'price_labels_A3.pdf' },
  ];

  const dispatchUpdates = [
    { id: '1', type: 'delivery', title: 'Fresh Farms Ltd - Delivery Arrived', message: 'Bay 2 • 45 items', time: '10 mins ago', icon: Truck, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: '2', type: 'task', title: 'Urgent Stock Check Required', message: 'Dairy Section • Assigned to: Sarah M.', time: '25 mins ago', icon: Package, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: '3', type: 'delay', title: 'Delivery Delayed', message: 'Bakery Express • Expected: 2:30 PM', time: '1 hour ago', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50' },
    { id: '4', type: 'scheduled', title: 'Upcoming Delivery', message: 'Daily Dairy Co • Scheduled: 11:00 AM', time: '2 hours ago', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle message sending
      setMessageInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Communication Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-900">Store Team</h3>
                <p className="text-sm text-gray-500 mt-1">8 members online</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Megaphone className="w-4 h-4" />
                Broadcast
              </button>
            </div>
          </div>

          {/* Chat Selector */}
          <div className="p-4 border-b border-gray-200 flex gap-2 overflow-x-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedChat === chat.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="w-4 h-4" />
                {chat.name}
                {chat.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                  {!message.isOwn && (
                    <p className="text-xs text-gray-600 mb-1 px-1">{message.sender}</p>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.attachment && (
                      <div className={`mt-2 pt-2 border-t ${message.isOwn ? 'border-blue-500' : 'border-gray-300'}`}>
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-xs">{message.attachment}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 px-1 ${message.isOwn ? 'text-right' : ''}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Dispatch Updates & Broadcast Panel */}
        <div className="space-y-6">
          {/* Broadcast Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-5 h-5 text-blue-600" />
              <h3 className="text-gray-900">Store Broadcast</h3>
            </div>
            <div className="space-y-3">
              <textarea
                placeholder="Send a message to all staff members..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
              ></textarea>
              <div className="flex gap-2">
                <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Staff</option>
                  <option>Stockroom Only</option>
                  <option>Checkout Only</option>
                  <option>Managers Only</option>
                </select>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap">
                  Broadcast
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Recent Broadcasts</p>
              <div className="space-y-2">
                <div className="text-xs bg-gray-50 p-2 rounded">
                  <p className="text-gray-900">"Delivery arriving in 10 minutes - Bay 2"</p>
                  <p className="text-gray-500 mt-1">2 hours ago</p>
                </div>
                <div className="text-xs bg-gray-50 p-2 rounded">
                  <p className="text-gray-900">"Team meeting at 3 PM - Break room"</p>
                  <p className="text-gray-500 mt-1">4 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dispatch Updates */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Dispatch Updates</h3>
            <div className="space-y-3">
              {dispatchUpdates.map((update) => {
                const Icon = update.icon;
                return (
                  <div key={update.id} className={`${update.bgColor} rounded-lg p-3`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${update.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{update.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{update.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{update.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Quick Contact</h3>
            <div className="space-y-2">
              {[
                { name: 'Store Manager', status: 'online' },
                { name: 'Warehouse Lead', status: 'online' },
                { name: 'Shift Supervisor', status: 'busy' },
                { name: 'Delivery Coordinator', status: 'offline' },
              ].map((contact, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-900">{contact.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className={`w-2 h-2 rounded-full ${
                          contact.status === 'online' ? 'bg-green-500' : 
                          contact.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-xs text-gray-500 capitalize">{contact.status}</span>
                      </div>
                    </div>
                  </div>
                  <Send className="w-4 h-4 text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
