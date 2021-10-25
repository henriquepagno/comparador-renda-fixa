import React, { ReactElement, ReactNode } from 'react';

import { ThirdPartyProvider } from './ThirdParty';
import { ChartProvider } from './Chart';
import { InformationProvider } from './Information';
import { ModalProvider } from './Modal';

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
          <ModalProvider>{children}</ModalProvider>
        </InformationProvider>
      </ChartProvider>
    </ThirdPartyProvider>
  );
}
