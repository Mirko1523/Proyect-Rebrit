import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CryptoList() {
  const [coinsData, setCoinsData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true'
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json) => {
        setCoinsData(json);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleBuy = (coin) => {
    setSelectedCoin(coin);
    navigate('/home/pay', { state: { coin: coin, quantity: quantity } });
  };

  return (
    <div className="p-6 space-y-6">
      {Object.keys(coinsData).map((coin) => {
        const coinInfo = coinsData[coin];
        const price = coinInfo.usd;
        const change = coinInfo.usd_24h_change.toFixed(2);
        return (
          <div
            key={coin}
            className={`p-4 rounded-lg shadow-lg border-2 border-gray-300 ${
              change < 0 ? 'border-red-500' : 'border-green-500'
            }`}
          >
            <div className="flex items-center">
              <img
                src={`/images/${coin}.png`}
                alt={coin}
                className="w-12 h-12 mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{coin}</h3>
                <p className="text-lg">${price}</p>
                <p
                  className={`text-lg ${
                    change < 0 ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {change}%
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="w-20 p-2 border-2 border-gray-300 rounded-lg mr-4"
              />
              <button
                onClick={() => handleBuy(coin)}
                className="px-4 py-2 bg-blue-950 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
              >
                Comprar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CryptoList;
