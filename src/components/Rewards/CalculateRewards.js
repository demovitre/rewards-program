import React, { useEffect, useState } from 'react';
import { calculatePoints } from '../../utility/CalculatePoints';

const RewardSummary = () => {
  const [, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the JSON file
    const fetchData = async () => {
      try {
        const response = await fetch('/mock_data/transactions.json');
        const result = await response.json();
        setTransactions(result);
        calculateRewards(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const calculateRewards = (transactions) => {
    const rewards = {};
    transactions.forEach(({ customerId, amount, date }) => {
      const month = new Date(date).getMonth() + 1;
      const points = calculatePoints(amount);
      if (!rewards[customerId]) rewards[customerId] = {};
      if (!rewards[customerId][month]) rewards[customerId][month] = 0;
      rewards[customerId][month] += points;
    });
    setRewards(rewards);
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Customer Rewards</h1>
      {Object.keys(rewards).map((customerId) => (
        <div key={customerId}>
          <h2>Customer {customerId}</h2>
          {Object.keys(rewards[customerId]).map((month) => (
            <p key={month}>
              Month {month}: {rewards[customerId][month]} points
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RewardSummary;
