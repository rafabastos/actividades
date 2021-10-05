import { ThemeImages, ThemeVariables } from '@/Theme/theme.type'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({}: ThemeVariables): ThemeImages {
  return {
    logo: require('@/Assets/Images/logo-full-box.png'),
    logoH: require('@/Assets/Images/logo-full.png'),
    menu: require('@/Assets/Images/menu.png'),
    logoFacebook: require('@/Assets/Images/facebook_icon.png'),
    logoInstagram: require('@/Assets/Images/instagram_icon.png'),
    logoGoogle: require('@/Assets/Images/google_icon.png'),
  }
}
