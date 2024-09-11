/** 
 * A customer receives 2 points for every dollar spent over $100 in each transaction, 
 * plus 1 point for every dollar spent between $50 and $100 in each transaction.
 * (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points) 
*/ 

export const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
        points += (amount - 100) * 2;
        amount = 100;
    }
    if (amount > 50) {
        points += (amount - 50) * 1;
    }
    return points;
};
