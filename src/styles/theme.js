import {
  createMuiTheme,
} from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#FF0000',
    },
    secondary: {
      main: '#00FF00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.5,
  },
});