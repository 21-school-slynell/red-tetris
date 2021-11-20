import { PaletteType } from '@material-ui/core';
import { BaseAPI } from './base.api';
import { HTTP } from './api';

const ThemeAPIInstance = new HTTP('/theme', '/api/v2');

export type ThemeProps = {
  type: PaletteType,
};

export class ThemeAPI extends BaseAPI {
  static change(data: ThemeProps) {
    return ThemeAPIInstance.put<ThemeProps, ThemeProps>('', { data });
  }
}
