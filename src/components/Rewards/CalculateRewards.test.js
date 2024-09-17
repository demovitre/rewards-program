import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RewardSummary from './CalculateRewards';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

test('renders customer rewards', async () => {
    const mockData = [
        { customerId: 1, amount: 120, date: '2023-08-01' },
        { customerId: 1, amount: 75, date: '2023-08-15' },
        { customerId: 2, amount: 200, date: '2023-08-20' },
    ];

    fetch.mockResponseOnce(JSON.stringify(mockData));

    render(<RewardSummary />);

    await waitFor(() => {
        expect(screen.getByText((content, element) => {
            console.log(element.textContent)
            return element.textContent.includes('Month 8: 195 points');
        })).toBeInTheDocument();

        expect(screen.getByText((content, element) => {
            return element.textContent.includes('Month 8: 250 points');
        })).toBeInTheDocument();
    });
});

test('handles fetch error', async () => {
    fetch.mockReject(new Error('Failed to fetch'));

    render(<RewardSummary />);

    await waitFor(() => {
        expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
});
