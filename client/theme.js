import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { red, brown } from '@mui/material/colors'

const theme = createTheme(adaptV4Theme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        light: '#f05545',
        main: '#b71c1c',
        dark: '#7f0000',
        contrastText: '#fff',
      },
      secondary: {
        light: '#fbfffc',
        main: '#c8e6c9',
        dark: '#97b498',
        contrastText: '#37474f',
      },
        openTitle: red['500'],
        protectedTitle: brown['300'],
        type: 'light'
      },
    }))

  export default theme