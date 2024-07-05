import React, { useEffect, useState } from 'react';
import api from '../../../api';
import '../CSS/DiversificationDashboardPage.css';
import AssetTypeHoldings from './Diversification/JSX/AssetTypeHoldings';
import EntropyHHI from './Diversification/JSX/EntropyHHI';
import MarketCapCountry from './Diversification/JSX/MarketCapCountry';
import SectorIndustry from './Diversification/JSX/SectorIndustry';
import LoadingScreen from '../../Static_Elements/LoadingScreen';

function DiversificationDashboardPage({ accountId }) {
  const [diversificationData, setDiversificationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiversificationData = async () => {
      try {
        const response = await api.get(`plaid/get-account-basic-asset-allocation-diversification/${accountId}`);
        console.log('Diversification data:', response.data);
        setDiversificationData(response.data);
      } catch (error) {
        console.error('Error fetching diversification data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchDiversificationData();
    }
  }, [accountId]);

  return (
    <div className="diversification-dashboard-unique-8">
      {loading && <LoadingScreen />}
      <h1>Diversification Dashboard</h1>
      {diversificationData ? (
        <>
          <div className="entropy-hhi-container-unique-8">
            <EntropyHHI entropy={diversificationData.sector_entropy} hhi={diversificationData.sector_hhi} />
          </div>
          <div className="sector-industry-container-unique-8">
            <SectorIndustry sectors={diversificationData.sectors} industries={diversificationData.industries} />
          </div>
          <div className="asset-type-holdings-container-unique-8">
            <AssetTypeHoldings assetTypes={diversificationData.asset_types} stocks={diversificationData.stocks} />
          </div>
          <div className="market-cap-country-container-unique-8">
            <MarketCapCountry marketCaps={diversificationData.market_caps} countries={diversificationData.countries} />
          </div>
        </>
      ) : (
        !loading && <p>No Data to Display</p>
      )}
    </div>
  );
}

export default DiversificationDashboardPage;
