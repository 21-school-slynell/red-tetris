import React, { FC, memo, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { snackbarSelector, themeSelector } from '@core/store';
import { SnackBar } from '@components/SnackBar';
import { globalThemeOverride } from './globalThemeOverride';
import { Header } from './components/Header';
import { Routing } from './components/Routing';

export const App: FC = memo(() => {
  const snackBar = useSelector(snackbarSelector);
  const { type } = useSelector(themeSelector);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={globalThemeOverride(type)}>
      <CssBaseline />
      <SnackBar open={snackBar.isVisible} {...snackBar} />
      <Container fixed maxWidth={false}>
        <Header />
        <Routing />
      </Container>
    </ThemeProvider>
  );
});
