import React, {
  createContext,
  useCallback,
  useContext,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';
import clsx from 'clsx';

import usePersistedState from '../hooks/usePersistedState';

import { Theme } from '../common/enums/Theme';
import existsLocalStorage from '../common/functions/existsLocalStorage';

interface ConfigContextData {
  theme: Theme;
  // eslint-disable-next-line no-unused-vars
  storeTheme(theme: Theme): void;
  // eslint-disable-next-line no-unused-vars
  getClassWithTheme(classes: string, themeClass: string): string;
}

interface ConfigProviderProps {
  children: ReactNode;
}

const ConfigContext = createContext<ConfigContextData>({} as ConfigContextData);

const localStorageKey = 'comparador-rf/theme';

export function ConfigProvider({
  children,
}: ConfigProviderProps): ReactElement {
  const [theme, setTheme] = usePersistedState<Theme>(
    Theme.Dark,
    localStorageKey
  );

  useEffect(() => {
    if (existsLocalStorage(localStorageKey)) return;

    if (window) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme(Theme.Dark);
      } else {
        setTheme(Theme.Light);
      }
    }
  }, [setTheme]);

  const storeTheme = useCallback(
    (theme: Theme) => {
      setTheme(theme);
    },
    [setTheme]
  );

  const getClassWithTheme = useCallback(
    (classes: string, themeClass: string) => {
      return clsx(classes, theme === Theme.Light && themeClass);
    },
    [theme]
  );

  return (
    <ConfigContext.Provider
      value={{
        theme,
        storeTheme,
        getClassWithTheme,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): ConfigContextData {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfig must be used within an ConfigProvider');
  }

  return context;
}
