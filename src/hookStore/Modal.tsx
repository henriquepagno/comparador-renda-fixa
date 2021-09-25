import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

interface ModalContextData {
  isInvestmentOptionModalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  storeInvestmentOptionModalVisible(visible: boolean): void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps): ReactElement {
  const [isInvestmentOptionModalVisible, setIsInvestmentOptionModalVisible] =
    useState(false);

  const storeInvestmentOptionModalVisible = useCallback((visible: boolean) => {
    setIsInvestmentOptionModalVisible(visible);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isInvestmentOptionModalVisible,
        storeInvestmentOptionModalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider');
  }

  return context;
}
