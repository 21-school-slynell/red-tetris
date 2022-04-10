import React, { FC, useEffect } from 'react';
import { Box, IconButton, Typography, useTheme } from '@material-ui/core';
import { Logo } from '@components/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { isServer, themeSelector } from 'client/core/store';
import { changeTypeThemeThunk } from 'client/core/store/actions/theme.actions';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

export const WrapperHeader: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { type } = useSelector(themeSelector);

  const handleChangeTypeTheme = () => dispatch(
    changeTypeThemeThunk({ type: type === 'dark' ? 'light' : 'dark' }),
  );

  const updateThemeOnSensor = (event: Event) => {
    const sensor = event.target;
    if ((sensor as any).illuminance <= 50) {
      dispatch(changeTypeThemeThunk({ type: 'dark' }));
    } else {
      dispatch(changeTypeThemeThunk({ type: 'light' }));
    }
  };

  useEffect(() => {
    if ('AmbientLightSensor' in window) {
      // @ts-ignore
      const sensor = new AmbientLightSensor();

      sensor.addEventListener('reading', updateThemeOnSensor);
      sensor.start();

      return function cleanup() {
        sensor.removeEventListener('reading', updateThemeOnSensor);
        sensor.stop();
      };
    }
  }, []);

  return (
    <Box
      component="header"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height={193}
    >
      <Logo color={theme.palette.primary.main} />
      <Typography color="primary" variant="h6">
        red tetris
      </Typography>
      <Box width="25%" display="flex" justifyContent="end">
        <IconButton onClick={handleChangeTypeTheme} size="small">
          {type === 'light' ? (
            <Brightness2Icon fontSize="inherit" />
                    ) : (
                      <WbSunnyIcon fontSize="inherit" />
                    )}
        </IconButton>
      </Box>
    </Box>
  );
};

const NullFC: FC = () => <></>;

export const Header = !isServer ? WrapperHeader : NullFC;
