export default (amount = 0, action) => {
  switch (action.type) {
    case 'increment':
      return amount + 1;
    case 'decrement':
      return amount - 1;
    default:
      return amount;
  }
};
