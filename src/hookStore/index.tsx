import React, { ReactElement, ReactNode } from 'react';

import { ThirdPartyProvider } from './ThirdParty';
import { ChartProvider } from './Chart';
import { InformationProvider } from './Information';
import { ModalProvider } from './Modal';
import { ToastProvider } from './Toast';
import { ConfigProvider } from './Config';

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
          <ConfigProvider>
            <ToastProvider>
              <ModalProvider>{children}</ModalProvider>
            </ToastProvider>
          </ConfigProvider>
        </InformationProvider>
      </ChartProvider>
    </ThirdPartyProvider>
  );
}
