import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  // const theme = createTheme();
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
