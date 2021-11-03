import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

import { assignColor } from '../common/functions/color';

import { ICalculatedOptions } from '../common/interfaces/calculated-data';
import { IInvestmentOption } from '../common/interfaces/investment-option';

interface InformationContextData {
  months: number;
  amountInvested: number;
  investmentOptions: IInvestmentOption[];
  // eslint-disable-next-line no-unused-vars
  storeMonths(months: number): void;
  // eslint-disable-next-line no-unused-vars
  storeAmountInvested(amount: number): void;
  // eslint-disable-next-line no-unused-vars
  addInvestmentOption(investmentOption: IInvestmentOption): void;
  // eslint-disable-next-line no-unused-vars
  removeInvestmentOption(investmentId: string): void;
  // eslint-disable-next-line no-unused-vars
  hightlightInvestmentOption(investmentId: string): void;
  unhightlightInvestmentOption(): void;
  // eslint-disable-next-line no-unused-vars
  storeInvestmentResults(calculatedOptions: ICalculatedOptions[]): void;
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
  const [investmentOptions, setInvestmentOptions] = useState<
    IInvestmentOption[]
  >([]);

  const storeMonths = useCallback((months: number) => {
    setMonths(months);
  }, []);

  const storeAmountInvested = useCallback((amount: number) => {
    setAmountInvested(amount);
  }, []);

  const addInvestmentOption = useCallback(
    (investmentOption: IInvestmentOption) => {
      if (investmentOptions.length < 6) {
        investmentOption.color = assignColor(investmentOptions) as
          | 'pink'
          | 'red'
          | 'purple'
          | 'blue'
          | 'yellow'
          | 'orange';

        investmentOption.shouldHighlight = false;

        let newInvestmentOptions = investmentOptions;
        newInvestmentOptions.push(investmentOption);

        setInvestmentOptions(newInvestmentOptions);
      }
    },
    [investmentOptions]
  );

  const removeInvestmentOption = useCallback(
    (investmentId: string) => {
      setInvestmentOptions(
        investmentOptions.filter((i) => i.id != investmentId)
      );
    },
    [investmentOptions]
  );

  const hightlightInvestmentOption = useCallback(
    (investmentId: string) => {
      const newInvestmentArray = investmentOptions.map((investment) => {
        return {
          ...investment,
          shouldHighlight: investment.id === investmentId ? true : false,
        };
      });

      setInvestmentOptions(newInvestmentArray);
    },
    [investmentOptions]
  );

  const unhightlightInvestmentOption = useCallback(() => {
    const newInvestmentArray = investmentOptions.map((investment) => {
      return {
        ...investment,
        shouldHighlight: false,
      };
    });

    setInvestmentOptions(newInvestmentArray);
  }, [investmentOptions]);

  const storeInvestmentResults = useCallback(
    (calculatedOptions: ICalculatedOptions[]) => {
      const newInvestmentArray = investmentOptions.map((investment) => {
        const option = calculatedOptions.find((a) => a.id === investment.id);

        return {
          ...investment,
          grossYield: option?.grossYield,
          netYield: option?.netYield,
          ranking: option?.ranking,
        };
      });

      setInvestmentOptions(newInvestmentArray);
    },
    [investmentOptions]
  );

  return (
    <InformationContext.Provider
      value={{
        months: months,
        amountInvested: amountInvested,
        investmentOptions: investmentOptions,
        storeMonths,
        storeAmountInvested,
        addInvestmentOption,
        removeInvestmentOption,
        hightlightInvestmentOption,
        unhightlightInvestmentOption,
        storeInvestmentResults,
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
