import React, { createContext, useEffect, useState } from 'react';

import { useWallet } from 'use-wallet';
import { checkNetwork } from '../../utils/wallet';

export interface NetworkContext {
  networkCorrect?: boolean
}

export const Context = createContext<NetworkContext>({
  networkCorrect: undefined,
})

const NetworkProvider: React.FC = ({ children }) => {
  const { account, connect } = useWallet()
  const [networkCorrect, setNetworkCorrect] = useState<boolean>()

  useEffect(() => {
    (async () => {
      if (networkCorrect) return;
      const hasSetup = await checkNetwork();
      setNetworkCorrect(hasSetup);
      if (hasSetup && !account) {
        connect('injected');
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{ networkCorrect }}>{children}</Context.Provider>
  )
}

export default NetworkProvider
