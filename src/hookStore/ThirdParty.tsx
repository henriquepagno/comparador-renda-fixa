import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

interface ThirdPartyContextData {
  yearlyIpca: number;
  yearlySelic: number;
  yearlyDi: number;
  // eslint-disable-next-line no-unused-vars
  storeIpca(ipca: number): void;
  // eslint-disable-next-line no-unused-vars
  storeSelic(selic: number): void;
  // eslint-disable-next-line no-unused-vars
  storeDi(di: number): void;
}

interface ThirdPartyProviderProps {
  children: ReactNode;
}

const ThirdPartyContext = createContext<ThirdPartyContextData>(
  {} as ThirdPartyContextData
);

export function ThirdPartyProvider({
  children,
}: ThirdPartyProviderProps): ReactElement {
  const [ipca, setIpca] = useState(0);
  const [selic, setSelic] = useState(0);
  const [di, setDi] = useState(0);

  const storeIpca = useCallback((yearlyIpca: number) => {
    setIpca(yearlyIpca);
  }, []);

  const storeSelic = useCallback((yearlySelic: number) => {
    setSelic(yearlySelic);
  }, []);

  const storeDi = useCallback((yearlyDi: number) => {
    setDi(yearlyDi);
  }, []);

  return (
    <ThirdPartyContext.Provider
      value={{
        yearlyIpca: ipca,
        yearlySelic: selic,
        yearlyDi: di,
        storeIpca,
        storeSelic,
        storeDi,
      }}
    >
      {children}
    </ThirdPartyContext.Provider>
  );
}

export function useThirdParty(): ThirdPartyContextData {
  const context = useContext(ThirdPartyContext);

  if (!context) {
    throw new Error('useThirdParty must be used within an ThirdPartyProvider');
  }

  return context;
}
