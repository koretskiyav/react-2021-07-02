import { createContext } from 'react';

export const userContext = createContext({
  name: 'Default user',
  setName: () => {},
});

export const UserProvider = userContext.Provider;
export const UserConsumer = userContext.Consumer;
