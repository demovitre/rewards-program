import transactions from "../../assets/mock_data/transaction";

export const fetchTransactions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(transactions);
        }, 1000);
    });
};