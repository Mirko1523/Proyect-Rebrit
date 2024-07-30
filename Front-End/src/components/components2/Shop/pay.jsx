import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';

function Pay() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state } = useLocation();
  const { coin, quantity } = state || { coin: 'bitcoin', quantity: 1 };
  const [isCard, setIsCard] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (coin) {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + coin + '&vs_currencies=usd')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((json) => {
          setPrice(json[coin]?.usd || 0);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [coin]);

  const totalPrice = (quantity * price).toFixed(2);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md mx-auto p-4 md:p-6">
            <h1 className="text-xl font-bold mb-4 text-center">Completa tu compra</h1>

            <div className="flex flex-wrap justify-center mb-4">
              <button
                className={`w-full md:w-1/2 py-2 px-4 rounded-t-lg ${isCard ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => setIsCard(true)}
              >
                Pagar con tarjeta
              </button>
              <button
                className={`w-full md:w-1/2 py-2 px-4 rounded-b-lg ${!isCard ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => setIsCard(false)}
              >
                Pagar con PayPal
              </button>
            </div>

            {isCard ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1" htmlFor="card-nr">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="card-nr"
                    className="w-full p-2 border rounded-lg text-sm"
                    type="text"
                    placeholder="1234 1234 1234 1234"
                  />
                </div>
                <div className="flex flex-wrap space-x-2">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-xs font-medium mb-1" htmlFor="card-expiry">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="card-expiry"
                      className="w-full p-2 border rounded-lg text-sm"
                      type="text"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-xs font-medium mb-1" htmlFor="card-cvc">
                      CVC <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="card-cvc"
                      className="w-full p-2 border rounded-lg text-sm"
                      type="text"
                      placeholder="CVC"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" htmlFor="card-name">
                    Name on Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="card-name"
                    className="w-full p-2 border rounded-lg text-sm"
                    type="text"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" htmlFor="card-email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="card-email"
                    className="w-full p-2 border rounded-lg text-sm"
                    type="email"
                    placeholder="john@company.com"
                  />
                </div>
                <div className="mt-4">
                  <button
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Pay ${totalPrice}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <button
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-sm"
                >
                  Pay with PayPal - ${totalPrice}
                </button>
                <p className="text-gray-500 mt-2 text-xs">
                  You'll be charged ${totalPrice}, including applicable VAT.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Pay;
