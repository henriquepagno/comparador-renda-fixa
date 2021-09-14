import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

interface CalculatedDataContextData {
  yearlyIpca: number;
  yearlySelic: number;
  // eslint-disable-next-line no-unused-vars
  storeIpca(ipca: number): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  storeSelic(selic: number): Promise<void>;
}

interface CalculatedDataProviderProps {
  children: ReactNode;
}

const CalculatedDataContext = createContext<CalculatedDataContextData>(
  {} as CalculatedDataContextData
);

export function CalculatedDataProvider({
  children,
}: CalculatedDataProviderProps): ReactElement {
  const [ipca, setIpca] = useState(0);
  const [selic, setSelic] = useState(0);

  const storeIpca = useCallback(async (yearlyIpca) => {
    setIpca(yearlyIpca);
  }, []);

  const storeSelic = useCallback(async (yearlySelic) => {
    setSelic(yearlySelic);
  }, []);

  return (
    <CalculatedDataContext.Provider
      value={{
        yearlyIpca: ipca,
        yearlySelic: selic,
        storeIpca,
        storeSelic,
      }}
    >
      {children}
    </CalculatedDataContext.Provider>
  );
}

export function useCalculatedData(): CalculatedDataContextData {
  const context = useContext(CalculatedDataContext);

  if (!context) {
    throw new Error(
      'useCalculatedData must be used within an CalculatedDataProvider'
    );
  }

  return context;
}
