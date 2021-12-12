import React, { ReactElement, ReactNode } from 'react';

import { ThirdPartyProvider } from './ThirdParty';
import { ChartProvider } from './Chart';
import { InformationProvider } from './Information';
import { ModalProvider } from './Modal';
import { ToastProvider } from './Toast';

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: AppProviderProps): ReactElement {
  return (
    <ThirdPartyProvider>
      <ChartProvider>
        <InformationProvider>
          <ToastProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </InformationProvider>
      </ChartProvider>
    </ThirdPartyProvider>
  );
}
