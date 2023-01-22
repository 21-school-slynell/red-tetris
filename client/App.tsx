/* eslint-disable global-require */
import React, { FC, memo, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { globalThemeOverride } from './globalThemeOverride';

export const App: FC = memo(() => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={globalThemeOverride('light')}>
      <CssBaseline />
      <div>
        <h1>IRAN</h1>
      </div>
    </ThemeProvider>
  );
});
