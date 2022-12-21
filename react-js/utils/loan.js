export const getItemTotal = (items) => {
    
    const countItemTotal = (acc, cur) => acc + cur.amount;
    return items.reduce(countItemTotal, 0);

}

export const getTotalPaymentPercentage = (totalLoan, totalPayment) => {
    
    if (totalLoan > 0) {
        return Math.round((totalPayment / totalLoan) * 100);
    } 
else {
        return 0;
    }
}
