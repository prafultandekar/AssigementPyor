import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const LineChart = () => {
  const [searchAsset, setSearchAsset] = useState('ethereum');
  const [selectedAsset, setSelectedAsset] = useState('ethereum');
  const [chartData, setChartData] = useState([]);

  const assetAPIs = {
    ethereum: 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=365&interval=daily', 
    dogecoin: 'https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=usd&days=365&interval=daily', 
    solana: 'https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=365&interval=daily', 
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get(assetAPIs[selectedAsset]);
      setChartData(response.data.prices);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedAsset]);

  const handleSearch = () => {
    setSelectedAsset(searchAsset);
  };

  const getChartOptions = () => {
    return {
      title: {
        text: ' Chart',
      },
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
      },
    
      series: [
        {
          data: chartData.map((item) => [new Date(item[0]), item[1]]),
          type: 'line',
          areaStyle: {
            color: 'rgba(0, 128, 255, 0.3)', 
          },
          lineStyle: {
            color: 'blue', 
            width: 2, 
          },
          smooth: true, 
          showSymbol: false, 
        },
      ],
    };
  };

  return (
    <div >
      <h2> Chart</h2>
      <div>
        <input
          type="text"
          placeholder="Search(ethereum, dogecoin, solana)"
          value={searchAsset}
          onChange={(e) => setSearchAsset(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div style={{ height: '400px' }}>
        <ReactECharts option={getChartOptions()} />
      </div>
    </div>
  );
};

export default LineChart;
