import React, { ReactElement, ReactNode } from 'react';

import { ThirdPartyProvider } from './ThirdParty';
import { CalculatedDataProvider } from './CalculatedData';
import { InformationProvider } from './Information';

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: AppProviderProps): ReactElement {
  return (
    <ThirdPartyProvider>
      <CalculatedDataProvider>
        <InformationProvider>{children}</InformationProvider>
      </CalculatedDataProvider>
    </ThirdPartyProvider>
  );
}
