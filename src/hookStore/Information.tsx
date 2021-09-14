import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

interface InformationContextData {
  months: number;
  amountInvested: number;
  // eslint-disable-next-line no-unused-vars
  storeMonths(months: number): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  storeAmountInvested(amount: number): Promise<void>;
}

interface InformationProviderProps {
  children: ReactNode;
}

const InformationContext = createContext<InformationContextData>(
  {} as InformationContextData
);

export function InformationProvider({
  children,
}: InformationProviderProps): ReactElement {
  const [months, setMonths] = useState(12);
  const [amountInvested, setAmountInvested] = useState(1000);

  const storeMonths = useCallback(async (months) => {
    setMonths(months);
  }, []);

  const storeAmountInvested = useCallback(async (amount) => {
    setAmountInvested(amount);
  }, []);

  return (
    <InformationContext.Provider
      value={{
        months: months,
        amountInvested: amountInvested,
        storeMonths,
        storeAmountInvested,
      }}
    >
      {children}
    </InformationContext.Provider>
  );
}

export function useInformation(): InformationContextData {
  const context = useContext(InformationContext);

  if (!context) {
    throw new Error(
      'useInformation must be used within an InformationProvider'
    );
  }

  return context;
}
