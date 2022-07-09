import { PaletteType } from '@material-ui/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { lightBlue, red, teal } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';

const shadowsOverride = shadows;
shadowsOverride[22] = '0px 9px 46px 8px rgba(0, 0, 0, 0.12)';

export const globalThemeOverride = (type: PaletteType = 'light') => createTheme({
  typography: {
    fontFamily: ['Oswald', 'sans-serif'].join(','),
    h3: {
      fontWeight: 700,
      textTransform: 'lowercase',
    },
    h6: {
      fontWeight: 700,
      textTransform: 'lowercase',
    },
    button: {
      fontFamily: ['Oswald', 'sans-serif'].join(','),
      textTransform: 'lowercase',
    },
  },
  palette: {
    type,
    primary: {
      main: type === 'light' ? '#BB1940' : red[500],
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: shadowsOverride,
});
