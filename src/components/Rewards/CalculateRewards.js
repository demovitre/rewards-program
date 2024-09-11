import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './api';
import { calculatePoints } from './CalculatePoints';

const RewardSummary = () => {
  const [, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      calculateRewards(data);
    });
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
