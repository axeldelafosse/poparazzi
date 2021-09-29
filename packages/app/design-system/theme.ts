import { Platform } from 'react-native';

const webFont = (font: string) =>
  Platform.select({
    web: `"${font}", Arial, Helvetica Neue, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    default: font
  });

const theme = {
  colors: {
    text: 'white',
    background: 'black',
    blue: '#2001F5'
  },
  fonts: {
    root: 'GraphikRegular'
  },
  customFonts: {
    GraphikRegular: {
      bold: webFont('GraphikBold'),
      default: webFont('GraphikRegular'),
      normal: webFont('GraphikRegular'),
      '300': webFont('GraphikRegular'),
      '400': webFont('GraphikRegular'),
      '500': webFont('GraphikMedium'),
      '600': webFont('GraphikSemibold'),
      '700': webFont('GraphikBold'),
      '800': webFont('GraphikBold'),
      '900': webFont('GraphikBlack')
    },
    NeueHaasGroteskDisplayW02Reg: {
      bold: webFont('NeueHaasGroteskDisplayW02Bold'),
      default: webFont('NeueHaasGroteskDisplayW02Reg'),
      normal: webFont('NeueHaasGroteskDisplayW02Reg'),
      '300': webFont('NeueHaasGroteskDisplayW02UltTh'),
      '400': webFont('NeueHaasGroteskDisplayW02Lt'),
      '500': webFont('NeueHaasGroteskDisplayW02Medium'),
      '600': webFont('NeueHaasGroteskDisplayW02Bold'),
      '700': webFont('NeueHaasGroteskDisplayW02Bold'),
      '800': webFont('NeueHaasGroteskDisplayW02Bold'),
      '900': webFont('NeueHaasGroteskDisplayW02Blk')
    }
  },
  space: [10, 12, 14],
  text: {
    thick: {
      fontFamily: 'root',
      fontWeight: 'black'
    }
  }
};

export { theme };
