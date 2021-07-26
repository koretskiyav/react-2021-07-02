import { useContext } from 'react';

import { currencies } from '../../constants';
import { CurrencyConsumer } from '../../contexts/currency';

const Price = ({ children: price }) => (
    <CurrencyConsumer>
        {({ currency: id }) =>
            `${(price * currencies[id].rate).toLocaleString(id, { style: 'currency', currency: currencies[id].label})}`
        }
    </CurrencyConsumer>
);

export default Price;
