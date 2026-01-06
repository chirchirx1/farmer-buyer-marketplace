import React, { useState } from 'react';
import { ShoppingCart, User, Phone, X, Check, Clock } from 'lucide-react';

const FarmerMarketplace = () => {
  const [view, setView] = useState('marketplace');
  const [userType, setUserType] = useState('buyer');
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactions, setTransactions] = useState([]);

  // Mock products
  const products = [
    { id: 1, name: 'Maize', farmer: 'John Kamau', price: 3500, unit: '90kg bag', location: 'Nakuru' },
    { id: 2, name: 'Tomatoes', farmer: 'Mary Wanjiku', price: 1200, unit: 'crate', location: 'Kiambu' },
    { id: 3, name: 'Potatoes', farmer: 'Peter Omondi', price: 2800, unit: '50kg bag', location: 'Molo' },
    { id: 4, name: 'Cabbage', farmer: 'Grace Achieng', price: 800, unit: '10 heads', location: 'Eldoret' },
    { id: 5, name: 'Milk', farmer: 'David Kipchoge', price: 50, unit: 'liter', location: 'Nandi' },
    { id: 6, name: 'Beans', farmer: 'Sarah Muthoni', price: 4200, unit: '90kg bag', location: 'Embu' }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + change);
        return {...item, quantity: newQty};
      }
      return item;
    }));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Mock M-Pesa STK Push
  const initiatePayment = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    setPaymentStatus('pending');
    
    // Simulate STK push delay
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        const txId = 'MPX' + Date.now().toString().slice(-8);
        const transaction = {
          id: txId,
          amount: getTotal(),
          phone: phoneNumber,
          date: new Date().toLocaleString(),
          status: 'completed',
          items: cart.length
        };
        setTransactions([transaction, ...transactions]);
        setPaymentStatus('success');
        setTimeout(() => {
          setCart([]);
          setShowCheckout(false);
          setPaymentStatus(null);
          setPhoneNumber('');
        }, 3000);
      } else {
        setPaymentStatus('failed');
        setTimeout(() => setPaymentStatus(null), 3000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">FarmConnect</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setView('marketplace')}
              className={`px-3 py-1 rounded ${view === 'marketplace' ? 'bg-green-700' : ''}`}
            >
              Market
            </button>
            {userType === 'buyer' && (
              <>
                <button
                  onClick={() => setView('transactions')}
                  className={`px-3 py-1 rounded ${view === 'transactions' ? 'bg-green-700' : ''}`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="relative"
                >
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </>
            )}
            <User size={24} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        {view === 'marketplace' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Products</h2>
            <div className="grid gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">by {product.farmer}</p>
                      <p className="text-sm text-gray-500">{product.location}</p>
                      <p className="text-green-600 font-bold mt-2">
                        KSh {product.price.toLocaleString()} / {product.unit}
                      </p>
                    </div>
                    {userType === 'buyer' && (
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'transactions' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-500">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {transactions.map(tx => (
                  <div key={tx.id} className="bg-white p-4 rounded shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">Transaction {tx.id}</p>
                        <p className="text-sm text-gray-600">{tx.date}</p>
                        <p className="text-sm text-gray-600">{tx.items} items</p>
                        <p className="text-sm text-gray-600">Phone: {tx.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          KSh {tx.amount.toLocaleString()}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-1">
                          <Check size={12} /> Completed
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Checkout</h3>
              <button onClick={() => setShowCheckout(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            KSh {item.price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 bg-gray-200 rounded"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-500"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>KSh {getTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* M-Pesa Payment */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <Phone size={20} />
                      <span>Pay with M-Pesa</span>
                    </div>

                    <input
                      type="tel"
                      placeholder="07XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      disabled={paymentStatus === 'pending'}
                    />

                    {paymentStatus === 'pending' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex items-center gap-2">
                        <Clock className="animate-spin" size={20} />
                        <div>
                          <p className="font-semibold">STK Push Sent</p>
                          <p className="text-sm text-gray-600">Enter M-Pesa PIN on your phone</p>
                        </div>
                      </div>
                    )}

                    {paymentStatus === 'success' && (
                      <div className="bg-green-50 border border-green-200 rounded p-3 flex items-center gap-2">
                        <Check size={20} className="text-green-600" />
                        <div>
                          <p className="font-semibold text-green-600">Payment Successful!</p>
                          <p className="text-sm text-gray-600">Your order has been placed</p>
                        </div>
                      </div>
                    )}

                    {paymentStatus === 'failed' && (
                      <div className="bg-red-50 border border-red-200 rounded p-3 flex items-center gap-2">
                        <X size={20} className="text-red-600" />
                        <div>
                          <p className="font-semibold text-red-600">Payment Failed</p>
                          <p className="text-sm text-gray-600">Please try again</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={initiatePayment}
                      disabled={paymentStatus === 'pending' || cart.length === 0}
                      className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {paymentStatus === 'pending' ? 'Processing...' : 'Pay Now'}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Secured by Safaricom M-Pesa
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerMarketplace;