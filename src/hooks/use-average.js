import { useState } from 'react';

export default function useAverage(reviews) {
    const reducer = (accumulator, currValue) => accumulator + currValue.rating;
    const getSum = (reviews) => reviews.reduce(reducer, 0);
    const averageRate = Math.round(getSum(reviews)/reviews.length);
    const [average] = useState(averageRate);

    return { average };
}
