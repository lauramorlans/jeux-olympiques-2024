import React, { useEffect, useState } from 'react';
import { getOffers } from './queries/getOffers';
import './App.css';

function App() {
  const [offers, setOffers] = useState({});

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
        {offers && offers?.offerIds?.map((offerId) => {
          const offer = offers?.offerEntities[offerId];
          return (
            <div key={offerId}>
              {offer?.name}
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
