import { useContext } from 'react';

import { currencies } from '../../constants';
import { CurrencyConsumer } from '../../contexts/currency';

const Price = ({ children: price }) => (
    <CurrencyConsumer>
        {({ currency: id }) => `${(price * currencies[id].rate).toFixed(2)} ${currencies[id].symbol}`}
    </CurrencyConsumer>
);

export default Price;
