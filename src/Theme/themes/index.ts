import * as default_dark from './default_dark'
import * as default_qhh from './default_qhh'

import { Theme } from '@/Theme/theme.type'

type Themes = { [key: string]: Partial<Theme> }

export default {
  default_dark,
    default_qhh,
} as Themes
