import React, { useEffect, useState } from 'react';
import { getOffers } from './queries/getOffers';
import './App.css';

function App() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const offersData = await getOffers();
      setOffers(offersData);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Here are the offers:
        {offers && offers?.map((offer) => {
          return (
            <div key={offer?.id}>
              {offer?.name} - {offer?.price}
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
