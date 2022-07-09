/* eslint-disable global-require */
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
// import { Rect0 } from './images/rect0';
// import { Rect1 } from './images/rect1';
// import { Rect2 } from './images/rect2';

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
      {/* <Rect1 />

      <Rect2 /> */}

      <Container
        fixed
        maxWidth={false}
        style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
      >
        <Header />
        <Routing />
      </Container>
    </ThemeProvider>
  );
});
